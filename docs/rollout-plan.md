# DevSecOps Rollout Plan — Acme Financial Services

**Scope:** 40 microservices | **Timeline:** 16 weeks | **Prepared for:** Engineering Manager

---

## What "Critical Services" Means

A service is classified **Critical** if it meets **any** of these criteria:

| Criterion | Example |
|-----------|---------|
| Handles payment transactions or PII | `payment-api`, `billing-service` |
| Internet-facing (public endpoint) | `customer-portal`, `mobile-api` |
| Past security incident or audit finding | Any service flagged in last 12 months |
| High traffic (>10,000 users/day) | `auth-service`, `checkout-api` |

**Non-critical examples:** `internal-reporting`, `dev-tools-dashboard`, `log-aggregator`

---

## Phase 1 — Foundation (Weeks 1–4)

| Item | Detail |
|------|--------|
| **Services** | 3 critical services: `payment-api`, `auth-service`, `customer-portal` |
| **Controls** | Secrets scanning (Gitleaks) + SCA (Trivy) in **warn-only** mode |
| **Why first** | Highest business risk; no application code changes required |
| **Team impact** | Developers see findings in CI logs but merges are not blocked yet |
| **Metric** | % of critical repos with secrets + SCA scanning enabled (target: 100% by Week 4) |

---

## Phase 2 — Expand & Enforce (Weeks 5–10)

| Item | Detail |
|------|--------|
| **Services** | All 15 internet-facing microservices |
| **Controls** | Switch SCA to **block** mode; add SAST (Semgrep); add container scanning |
| **Adoption** | 2-week warn-only period per service before switching to block |
| **Developer pushback** | Security team provides 4-hour triage SLA for blocked PRs |
| **Metric** | Mean time to remediate Critical CVEs (target: <7 days) |

---

## Phase 3 — Full Coverage (Weeks 11–16)

| Item | Detail |
|------|--------|
| **Services** | All 40 microservices |
| **Controls** | Branch protection enforced; SBOM on every build; hardened Dockerfiles |
| **Governance** | Exception process live; monthly security dashboard for leadership |
| **Metric** | % of PRs with all security gates passing on first attempt (track trend monthly) |

---

## Adoption Strategy

1. **Warn before block** — Every new control runs in warn-only for 2 weeks so developers learn without disruption.
2. **Security champions** — One developer per team trained to triage findings and help teammates.
3. **Office hours** — Weekly 30-minute session for questions about pipeline failures.
4. **Documentation** — Internal wiki with "how to fix common findings" for each scanner.

---

## Handling Developer Pushback

When a developer says *"this gate is blocking my urgent fix"*:

1. **Is it a false positive?** → File exception request (see below).
2. **Is it a real finding?** → Security helps triage within 4 hours; EM can approve emergency bypass with 48-hour remediation ticket.
3. **Is the tool misconfigured?** → Security team adjusts thresholds; never permanently disable a gate without EM + Security sign-off.

---

## Exception Process

| Step | Action |
|------|--------|
| 1 | Developer files exception: finding ID, justification, remediation date |
| 2 | Security reviews within 1 business day |
| 3 | Approved exceptions expire automatically after **30 days** |
| 4 | All exceptions tracked in shared dashboard; reviewed monthly |

---

## Metrics Dashboard (Track Monthly)

| Metric | Target |
|--------|--------|
| % repos with full pipeline coverage | 100% by Week 16 |
| Mean time to remediate Critical CVEs | <7 days |
| Open security exceptions | Decreasing trend |
| % PRs blocked by security gates | Track trend (not just count) |
| Secrets found in repos (pre-commit) | Zero |
