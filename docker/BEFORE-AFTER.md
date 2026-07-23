# Dockerfile Before/After Comparison — DevSecOps Challenge

## Summary

| Control | Before (`Dockerfile.original`) | After (`Dockerfile.hardened`) |
|---------|-------------------------------|-------------------------------|
| Base image | `node:24` (~1 GB) | `node:24-alpine` (~180 MB) |
| Build stages | Single stage | Multi-stage (builder + runtime) |
| User | `root` | `appuser` (UID 1001) |
| Dependencies | `npm install` (includes dev) | `npm ci --omit=dev` (production only) |
| Attack surface | Full source + dev tools in image | Only built artifacts copied |
| Health check | None | HTTP healthcheck every 30s |
| Unnecessary files | Everything copied | Dev/test artifacts removed |

## Security improvements explained

1. **Non-root user** — If the container is compromised, attacker has limited privileges.
2. **Minimal base image (Alpine)** — Fewer OS packages = fewer CVEs.
3. **Multi-stage build** — Build tools stay in builder stage, not in production image.
4. **Production dependencies only** — Dev packages with known CVEs excluded.
5. **Health check** — Orchestrator can detect and restart unhealthy containers.

## How to build and run

```bash
# Build hardened image
docker build -f docker/Dockerfile.hardened -t juice-shop:secure .

# Run
docker run -p 3000:3000 juice-shop:secure

# Open http://localhost:3000
```

## Note

Juice Shop's official `Dockerfile` at repo root already uses distroless + non-root (UID 65532).
Our `Dockerfile.original` represents Acme's **insecure starting point** before hardening.
Our `Dockerfile.hardened` demonstrates the security improvements required by the challenge.
