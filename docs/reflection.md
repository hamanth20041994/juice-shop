# Written Reflection — DevSecOps Challenge

**Author:** Security Consultant | **Date:** July 2026 | **Project:** Acme Financial Services / OWASP Juice Shop

---

## Methodology

I followed a **risk-first, incremental** approach:

1. **Assess** — Identified top 5 risks for the Engineering Manager (Risk Brief).
2. **Build** — Implemented security gates in GitHub Actions around OWASP Juice Shop without modifying application source code.
3. **Validate** — Demonstrated gates catching real vulnerabilities (Trivy SCA, Semgrep SAST, container scan).
4. **Govern** — Added branch protection rules requiring PR review and passing security checks.
5. **Plan** — Designed a phased 16-week rollout for 40 microservices.

---

## Trade-offs and Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| CI/CD platform | GitHub Actions | Matches Acme's existing setup in the scenario |
| SAST tool | Semgrep | Fast setup, easy custom rules in YAML, free for open source |
| SCA + Container + SBOM | Trivy (`v0.35.0`) | Single tool covers all three; no license cost |
| Secrets scanning | Gitleaks | Industry standard, integrates with GitHub Actions |
| Target application | OWASP Juice Shop (fork) | Intentionally vulnerable app proves gates work |
| Pipeline failures | Allow red builds on Critical/High | Demonstrates gating; blocking insecure releases is the goal |
| Git push issues | Upload via GitHub web UI | Corporate network blocked HTTPS push; web upload achieved same result |

---

## Challenges Encountered

1. **Git push 403 errors** — Corporate network blocked pushes to GitHub. Resolved by uploading files via GitHub web interface.

2. **Trivy action version errors** — Old tags (`0.28.0`, `v0.12.0`) were removed after a supply-chain incident. Fixed by using `@v0.35.0`.

3. **Gitleaks allowlisting** — AWS documentation example keys (`AKIAIOSFODNN7EXAMPLE`) are allowlisted by Gitleaks. Semgrep SAST caught the hardcoded secrets via our custom rule instead — demonstrated false positive handling in practice.

4. **Juice Shop's existing CI/CD** — The upstream repo has its own workflows that also run on push. These are separate from our DevSecOps pipeline and were ignored as out of scope.

5. **Branch protection status checks** — GitHub only shows job names after pipeline runs. Required individual job names (Gitleaks, Semgrep, Trivy) rather than workflow name.

---

## False Positive Handling

Documented in `sast/FALSE-POSITIVES.md`:
- Inline suppression: `// nosemgrep: rule-id`
- File-level ignore via `.semgrepignore`
- Exception process for approved suppressions with expiry

---

## What I Would Improve With More Time

1. **Central dashboard** — Integrate findings into DefectDojo or GitHub Security tab for unified view.
2. **DAST scanning** — Add OWASP ZAP against running container for runtime vulnerability detection.
3. **Policy as code** — Use OPA/Rego for custom gate logic beyond severity thresholds.
4. **Pre-commit hooks** — Run Gitleaks and Semgrep locally before push to catch issues earlier.
5. **Slack notifications** — Alert security team when Critical findings block a pipeline.
6. **Hardened Dockerfile in pipeline** — Switch container build from root `Dockerfile` to `docker/Dockerfile.hardened` once validated.

---

## Key Learnings

- **Working demos matter more than green pipelines** — A pipeline that catches real vulnerabilities is more valuable than one that always passes.
- **Developer adoption is the hardest part** — Tools are easy to configure; getting teams to accept blocked merges requires trust, warn-only phases, and fast triage.
- **Supply chain security applies to security tools too** — The Trivy action version incident showed why pinning to known-safe versions matters.
