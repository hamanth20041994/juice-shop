# Risk Brief — Acme Financial Services

**Date:** July 23, 2026  
**Prepared for:** Engineering Manager  
**Prepared by:** Security Consultant (DevSecOps Engagement)

---

## Executive Summary

Acme Financial Services runs a modern development team but has no dedicated security function. Code moves from developer laptops to production with no automated security checks. The five risks below are the most urgent — any one of them could lead to a data breach, service outage, or regulatory penalty.

---

## Top 5 Security Risks

| # | Risk | Rating | Justification |
|---|------|--------|---------------|
| 1 | Secrets (passwords, API keys) stored in Git repositories | **Critical** | Anyone with repo access can steal credentials and access production systems |
| 2 | No scanning of third-party software libraries for known vulnerabilities | **Critical** | Known security flaws in dependencies ship to production undetected |
| 3 | All cloud service accounts have full administrator access | **Critical** | One compromised account gives an attacker complete control of our cloud environment |
| 4 | No code review or branch protection on the main branch | **High** | Buggy or malicious code can reach production without any review |
| 5 | Docker containers run as root with unhardened base images | **High** | A container compromise gives the attacker elevated privileges on the host |

---

## Attack Scenarios (Critical & High Risks)

### Risk 1 — Secrets in Git

A contractor or former employee still has access to the code repository. They search the Git history and find a `.env` file containing database passwords and payment API keys. They use those credentials to access the customer database and export thousands of financial records. **Business impact:** Data breach notification costs, regulatory fines (PCI-DSS, GDPR), loss of customer trust, potential lawsuits.

### Risk 2 — Vulnerable Dependencies

The application uses a popular JavaScript library with a publicly known security flaw (CVE). Because no dependency scanning runs in the pipeline, the vulnerable version is deployed to production. An attacker sends a crafted request that exploits the flaw and executes code on the server. **Business impact:** Full application takeover, service downtime, possible theft of transaction data.

### Risk 3 — Over-Privileged Cloud Access

An attacker gains access to a single microservice through a misconfigured endpoint. Because that service's cloud account has administrator-level permissions, the attacker creates new admin users, opens backdoors, and accesses every other system in our cloud account. **Business impact:** Complete infrastructure compromise, extended outage, forensic investigation costs.

### Risk 4 — No Code Review

A developer accidentally commits code that disables authentication on an internal API. Because there is no required review and no branch protection, the change merges directly to the main branch and deploys automatically. An external scanner discovers the open endpoint within hours. **Business impact:** Unauthorized access to internal APIs, potential data exposure.

---

## Recommended Fix Order

| Priority | Action | Why First |
|----------|--------|-----------|
| 1 | **Secrets scanning in the pipeline** | Fastest to implement; stops active credential exposure immediately |
| 2 | **Dependency vulnerability scanning** | Catches known flaws before they reach production; no code changes needed |
| 3 | **Static code analysis (SAST)** | Finds security bugs in new code as developers write it |
| 4 | **Container hardening and image scanning** | Reduces runtime attack surface; limits damage if a container is compromised |
| 5 | **Branch protection and required reviews** | Enforces all of the above on every change; prevents bypass |

---

*This document is intended for the Engineering Manager. It describes business risk in plain language and recommends a practical order of remediation.*
