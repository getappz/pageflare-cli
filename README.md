# @pageflare/cli

Optimize static site output for PageSpeed. Pageflare processes your SSG build output (HTML, CSS, JS, images) and applies production-grade optimizations.

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

# Generate a config file
pageflare --init

# Output manifest as JSON
pageflare dist --json

# Update to the latest version
pageflare upgrade
```

## Options

```
Arguments:
  [INPUT]                Path to the SSG output directory [default: .]

Options:
  -o, --output <OUTPUT>  Output directory (defaults to <input>/.appz)
      --in-place         Overwrite files in-place
      --json             Output manifest as JSON
      --force            Force reprocessing even if no files changed
  -c, --config <CONFIG>  Path to config file (defaults to <input>/pageflare.jsonc)
      --init             Generate a pageflare.jsonc config file
      --login            Log in to activate your Pro license
      --no-progress      Disable progress spinners
      --log <LOG>        Log level: off, error, warn, info, debug, trace [default: warn]
  -h, --help             Print help
  -V, --version          Print version

Subcommands:
  upgrade                Update pageflare to the latest version (--force to reinstall)
```

## Supported Platforms

This package installs a platform-specific binary via optional dependencies:

| Platform | Package |
|---|---|
| Linux x64 (glibc) | `@pageflare/cli-linux-x64` |
| Linux arm64 (glibc) | `@pageflare/cli-linux-arm64` |
| Linux x64 (musl) | `@pageflare/cli-linux-x64-musl` |
| Linux arm64 (musl) | `@pageflare/cli-linux-arm64-musl` |
| macOS x64 | `@pageflare/cli-darwin-x64` |
| macOS arm64 | `@pageflare/cli-darwin-arm64` |
| Windows x64 | `@pageflare/cli-win32-x64` |

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
