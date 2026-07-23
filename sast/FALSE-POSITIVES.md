# Handling False Positives in SAST

When Semgrep reports a finding that is not a real vulnerability:

## Option 1: Inline suppression (per line)
```javascript
// nosemgrep: juice-shop-sql-injection
db.query("SELECT 1"); // safe static query, reviewed 2026-07-23
```

## Option 2: File-level ignore (.semgrepignore)
Add file paths to `sast/.semgrepignore`:
```
test/
**/*.spec.ts
```

## Option 3: Rule tuning
Adjust the custom rule in `sast/custom-rules/juice-shop-rules.yml` to narrow the pattern.

## Process
1. Developer documents why the finding is a false positive
2. Security reviewer approves the suppression
3. Suppression includes date and reviewer name in the comment
