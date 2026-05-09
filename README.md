# @pageflare/cli

Optimize static site output for PageSpeed. Pageflare processes your SSG build output (HTML, CSS, JS, images) and applies production-grade optimizations.

## GitHub Action

Add one step to your workflow — no install needed:

```yaml
- uses: getappz/pageflare-cli@v1
```

With options:

```yaml
- uses: getappz/pageflare-cli@v1
  with:
    args: "dist -o optimized --platform vercel"
```

| Input | Default | Description |
|-------|---------|-------------|
| `version` | `latest` | CLI version to install |
| `args` | | Arguments passed to `pageflare optimize` |

## Install

```bash
npm install -g @pageflare/cli
```

Or as a dev dependency:

```bash
npm install -D @pageflare/cli
```

## Usage

```bash
# Optimize current directory
pageflare

# Optimize a specific build directory
pageflare dist

# Write optimized files to a separate output directory
pageflare dist -o optimized

# Overwrite files in-place
pageflare dist --in-place

# Wipe the output directory before writing (full reset)
pageflare dist -o optimized --clean-output

# Skip the browser-driven extractor (for CI environments without Chrome)
pageflare dist --no-browser

# Generate a config file
pageflare init

# Output manifest as JSON
pageflare dist --json

# Audit site for performance issues
pageflare audit dist

# Audit AI-readiness (GEO score) — auto-classifies as Content / API / All
pageflare geo audit --path dist/
pageflare geo audit --url https://example.com
pageflare geo audit --path dist/ --format github --badge

# Force a profile, or explain which signals drove auto-classification
pageflare geo audit --path dist/ --profile content
pageflare geo audit --path dist/ --explain-profile

# Auto-fix GEO issues (deterministic, no API key — requires Solo license)
pageflare geo fix dist/ --auto
pageflare geo fix dist/ --auto --profile api   # API/app sites only get API/MCP/agent-card templates

# Audit SEO (technical SEO score, free)
pageflare seo audit dist/

# Auto-fix SEO issues (deterministic — requires Solo license)
pageflare seo fix dist/ --auto

# PWA: generate manifest + service worker + icons locally (free)
pageflare pwa build

# Update to the latest version
pageflare upgrade
```

## Options

```
Arguments:
  [INPUT]                  Path to the project root or SSG output directory [default: .]

Options:
  -o, --output <OUTPUT>    Output directory (defaults to <input>/.appz/output/static)
      --in-place           Overwrite files in-place
      --clean-output       Wipe the output directory before writing
      --json               Output manifest as JSON
      --force              Force reprocessing even if no files changed
  -c, --config <CONFIG>    Path to config file (defaults to <input>/pageflare.jsonc)
      --platform <PLATFORM>  Deployment platform: auto, vercel, netlify, cloudflare-pages, none [default: auto]
      --prod               Production build — enables CDN image rewrites (e.g. Cloudflare Pages)
      --no-browser         Skip browser-driven critical-CSS / preload extraction (heuristic fallback)
      --login              Log in to activate your Pro license
      --no-progress        Disable progress spinners
      --log <LOG>          Log level: off, error, warn, info, debug, trace [default: warn]
  -h, --help               Print help
  -V, --version            Print version

Subcommands:
  optimize               Run optimizations (default when no subcommand given)
  audit                  Audit a static site for performance issues
  geo audit              Audit AI-readiness (GEO score, 0–100). Auto-classifies the site
                         as Content / API / All; override with --profile, debug with --explain-profile.
  geo fix                Fix GEO issues — deterministic (--auto) or LLM (BYOK). Profile-aware:
                         template generators are filtered to match the resolved site type. Requires Solo+ license.
  seo audit              Audit technical SEO (score 0–100)
  seo fix                Fix SEO issues — deterministic (--auto) or LLM (BYOK). Requires Solo+ license.
  pwa build              Generate manifest, service worker, icons, and SDK script (free)
  pwa init|config|push|stats   Manage cloud PWA: push notifications, analytics, install pages
  speed                  Measure Core Web Vitals via PageSpeed Insights
  sites add|list|remove  Register sites for monitoring
  schedule add|list      Schedule recurring audits (cron-based)
  studio                 Launch the local monitoring dashboard (pageflare-studio)
  init                   Generate a pageflare.jsonc config file
  login                  Activate a CLI license
  upgrade                Update pageflare to the latest version (--force to reinstall)
```

Pageflare auto-detects your SSG framework (Next.js, Astro, Gatsby, Nuxt, Vite, Hugo, Jekyll, and more) and resolves the correct build output directory.

## Documentation

- [Getting Started](https://pageflare.dev/docs/getting-started) — install, configure, and run your first optimization
- [CLI Commands](https://pageflare.dev/docs/cli/commands) — full reference for all subcommands and flags
- [Configuration](https://pageflare.dev/docs/cli/configuration) — `pageflare.jsonc` options and per-feature settings
- [Changelog](https://pageflare.dev/docs/changelog) — release notes and version history
- [WordPress Guide](https://pageflare.dev/wordpress) — static export and edge optimization workflows
- [Free Audit](https://pageflare.dev/audit) — live PageSpeed analysis with fix recommendations

## Supported Platforms

This package installs a platform-specific binary via optional dependencies:

| Platform | Package |
|---|---|
| Linux x64 (glibc) | `@pageflare/cli-linux-x64` |
| Linux arm64 (glibc) | `@pageflare/cli-linux-arm64` |
| Linux x64 (musl) | `@pageflare/cli-linux-x64-musl` |
| Linux arm64 (musl) | `@pageflare/cli-linux-arm64-musl` |
| Windows x64 | `@pageflare/cli-win32-x64` |

macOS support is planned but not yet shipped. macOS users can run pageflare via Docker (`docker run --rm -v $(pwd):/site pageflare/cli /site`) or via WSL/a Linux VM in the meantime.

## Alternative Install Methods

```bash
# Homebrew
brew tap getappz/tap && brew install pageflare

# Shell (Linux/macOS)
curl -fsSL https://get.appz.dev/pageflare/install.sh | sh

# PowerShell (Windows)
irm https://get.appz.dev/pageflare/install.ps1 | iex

# Docker
docker run --rm -v $(pwd):/site pageflare/cli /site
```

## License

MIT
