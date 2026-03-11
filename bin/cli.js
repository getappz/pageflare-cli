#!/usr/bin/env node

const { spawnSync, execSync } = require("node:child_process");
const { existsSync, readdirSync } = require("node:fs");
const path = require("node:path");

const PLATFORMS = {
	"linux-x64-glibc": "@pageflare/cli-linux-x64",
	"linux-x64-musl": "@pageflare/cli-linux-x64-musl",
	"linux-arm64-glibc": "@pageflare/cli-linux-arm64",
	"linux-arm64-musl": "@pageflare/cli-linux-arm64-musl",
	"darwin-x64": "@pageflare/cli-darwin-x64",
	"darwin-arm64": "@pageflare/cli-darwin-arm64",
	"win32-x64": "@pageflare/cli-win32-x64",
};

function detectLibc() {
	if (process.platform !== "linux") return null;

	// Check for musl dynamic linker in /lib
	try {
		const libs = readdirSync("/lib");
		if (libs.some((f) => f.startsWith("ld-musl-"))) return "musl";
	} catch {}

	// Fallback: check ldd --version output (prints "musl libc" on musl systems)
	try {
		const lddOutput = execSync("ldd --version 2>&1", { encoding: "utf8" });
		if (lddOutput.toLowerCase().includes("musl")) return "musl";
	} catch {}

	return "glibc";
}

function getPlatformPackage() {
	const { platform, arch } = process;

	const key =
		platform === "linux"
			? `${platform}-${arch}-${detectLibc()}`
			: `${platform}-${arch}`;

	const pkg = PLATFORMS[key];
	if (!pkg) {
		console.error(
			`Error: Unsupported platform "${key}".\n\n` +
				"Pageflare CLI supports:\n" +
				Object.entries(PLATFORMS)
					.map(([k, v]) => `  - ${k} (${v})`)
					.join("\n") +
				"\n\nIf you believe this platform should be supported, please file an issue.",
		);
		process.exit(1);
	}

	return pkg;
}

function getBinaryPath(pkg) {
	const binaryName =
		process.platform === "win32" ? "pageflare.exe" : "pageflare";
	try {
		const pkgDir = path.dirname(require.resolve(`${pkg}/package.json`));
		return path.join(pkgDir, "bin", binaryName);
	} catch {
		console.error(
			`Error: Platform package "${pkg}" is not installed.\n\n` +
				"Try reinstalling:\n" +
				"  npm install @pageflare/cli\n",
		);
		process.exit(1);
	}
}

const pkg = getPlatformPackage();
const binaryPath = getBinaryPath(pkg);

if (!existsSync(binaryPath)) {
	console.error(
		`Error: Binary not found at "${binaryPath}".\n\n` +
			`The platform package "${pkg}" is installed but the binary is missing.\n` +
			"Try reinstalling:\n" +
			"  npm install @pageflare/cli\n",
	);
	process.exit(1);
}

const result = spawnSync(binaryPath, process.argv.slice(2), {
	stdio: "inherit",
});

if (result.error) {
	console.error(
		`Error: Failed to execute pageflare binary: ${result.error.message}`,
	);
	process.exit(1);
}

if (result.signal) {
	process.kill(process.pid, result.signal);
} else {
	process.exit(result.status ?? 1);
}
