"""Audit the live site against the September 2026 external review.

Version 2. The first version searched for the reviewer's exact quoted wording, and
the front page survived it by saying "gap" where he had quoted "span". The banned
patterns below now target the *claim*, not the phrasing.
"""
import re, html, urllib.request, sys

BASE = 'https://www.deriskmatrix.com'
PAGES = ['', '/about', '/analyze', '/bygg', '/culture', '/dpa', '/finans',
         '/methodology', '/pricing', '/privacy', '/saas', '/score', '/security',
         '/terms', '/validation']

# ── Claim 1: the target–threshold interval IS risk appetite ──────────────────
# Any construction that equates an interval with appetite, however phrased.
INTERVAL = r'(span|gap|space|range|distance|difference|interval|between them)'
APPETITE = r'risk appetite'

BANNED = [
    ('interval equated with appetite',
     INTERVAL + r'[^.]{0,60}\b(is|are|defines?|equals?)\b[^.]{0,40}' + APPETITE),
    ('goals/targets define appetite',
     r'\b(goals?|targets?|thresholds?)\b[^.]{0,30}\bdefines?\b[^.]{0,20}' + APPETITE),
    ('appetite gets "better defined" by data',
     APPETITE + r'[^.]{0,30}\b(better|more)\b[^.]{0,15}defined'),
    ('explicit risk appetite as a synonym for the span',
     r'your (explicit )?risk appetite\b(?![^.]{0,80}statement)'),

    # ── Claim 2: forecasting reduces uncertainty ─────────────────────────────
    ('forecasting reduces uncertainty',
     r'forecast\w*[^.]{0,40}\breduces?\b[^.]{0,25}(uncertainty|it\b)'),

    # ── Claim 3: culture is THE primary barrier ──────────────────────────────
    ('culture as the primary barrier',
     r'culture is the (primary|main|biggest|principal) barrier'),

    # ── Claim 4: our own mapping presented as research-backed ────────────────
    ('our practice called evidence-based',
     r'grounded in evidence-based practice'),
    ('six states grounded in the literature',
     r'(six (risk )?states|cultural response\w*)[^.]{0,60}grounded in[^.]{0,60}'
     r'(Edmondson|research|ISO 45003)'),
    ('states described as validated/proven',
     r'(six (risk )?states|risk state model)[^.]{0,40}\b(validated|proven|empirically established)\b'),

    # ── Claim 5: the classification is free of judgement ─────────────────────
    # Contradicts the protocol, which measures classification reliability
    # precisely because evidence is the one genuinely subjective axis.
    ('classification claimed free of judgement',
     r'no subjectivity|eliminat\w* subjectiv|removes? subjectiv|'
     r'(?<!not )(fully|entirely|purely) objective'),
]

# Escaping artefacts: a correction that renders wrong is worse than no correction.
ARTEFACTS = [
    ('literal unicode escape', r'\\u[0-9a-fA-F]{4}'),
    ('stray backslash-quote',  r"\\['\"]"),
    ('double-escaped entity',  r'&amp;(apos|quot|[lr]dquo|mdash|ndash);'),
    ('undefined in text',      r'\bundefined\b'),
    ('NaN in text',            r'\bNaN\b'),
    ('empty template slot',    r'\{\{|\}\}'),
]

# Corrections that must be present where they belong.
REQUIRED = {
    '/methodology': [
        'one operational expression of your tolerance',
        'What is established, and what is not',
        'Not yet empirically validated',
        'Where these claims come from',
        'does not mean the forecast is reliable',
        'no identified fragility',
        'a property of the construction',
        'validation protocol',
    ],
    '/culture': [
        'shared belief held by members of a team',
        'Administrative Science Quarterly',
        'It does not establish our six-state response model',
        'is our own',
        'the barrier we think matters most',
    ],
    '/score': ['Forecasting does not remove it'],
    '/about': [
        'makes tolerance for that objective explicit',
        'it does not validate the six-state model',
    ],
    '/validation': [
        'pre-registered',
        'None of the assumptions we explicitly identified has yet been invalidated',
        'If all assumptions remain valid, the forecast is reliable',
        'insufficient data',
        'Complexity should earn its place',
        '30 goal-periods',
        'Structural validity',
        'Empirical validity',
        'Decision usefulness',
    ],
    '': ['makes your tolerance for that goal explicit'],
}

# Every page must offer a route to the protocol, or the claim that it is published
# is only true for people who already know where to look.
REACHABLE = 'href="/validation"'


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'audit'})
    raw = urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'replace')
    body = re.sub(r'(?is)<(script|style|noscript)[^>]*>.*?</\1>', ' ', raw)
    body = re.sub(r'(?s)<[^>]+>', ' ', body)
    return re.sub(r'\s+', ' ', html.unescape(body)), raw


def ctx(txt, m):
    i = m.start()
    return '...' + txt[max(0, i - 55):i + 75].strip() + '...'


fails = 0
for p in PAGES:
    txt, raw = fetch(BASE + p)
    issues = []

    for label, pat in BANNED:
        m = re.search(pat, txt, re.I)
        if m:
            issues.append('CLAIM: %s -> %s' % (label, ctx(txt, m)))

    for label, pat in ARTEFACTS:
        m = re.search(pat, txt)
        if m:
            issues.append('ARTEFACT: %s -> %s' % (label, ctx(txt, m)))

    for need in REQUIRED.get(p, []):
        if need.lower() not in txt.lower():
            issues.append('MISSING: ' + need)

    if REACHABLE not in raw:
        issues.append('NO ROUTE to /validation from this page')

    print('%s %-14s (%d chars)' % ('OK  ' if not issues else 'FAIL', p or '/', len(txt)))
    for i in issues:
        print('       - ' + i)
    if issues:
        fails += 1

print('\n%d of %d pages with issues' % (fails, len(PAGES)))
sys.exit(1 if fails else 0)
