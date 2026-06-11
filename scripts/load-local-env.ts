import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const originalEnvKeys = new Set(Object.keys(process.env));

function parseEnvLine(line: string) {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith("#")) {
    return null;
  }

  const normalized = trimmed.startsWith("export ") ? trimmed.slice(7).trim() : trimmed;
  const separatorIndex = normalized.indexOf("=");

  if (separatorIndex === -1) {
    return null;
  }

  const key = normalized.slice(0, separatorIndex).trim();
  let value = normalized.slice(separatorIndex + 1).trim();

  if (!key) {
    return null;
  }

  const quote = value[0];
  if (
    value.length >= 2 &&
    (quote === '"' || quote === "'" || quote === "`") &&
    value[value.length - 1] === quote
  ) {
    value = value.slice(1, -1);

    if (quote === '"') {
      value = value.replace(/\\n/g, "\n").replace(/\\r/g, "\r");
    }
  } else {
    value = value.replace(/\s+#.*$/, "");
  }

  return { key, value };
}

function loadEnvFile(filename: string) {
  const path = resolve(process.cwd(), filename);

  if (!existsSync(path)) {
    return;
  }

  const contents = readFileSync(path, "utf8");

  for (const line of contents.split(/\r?\n/)) {
    const parsed = parseEnvLine(line);

    if (!parsed) {
      continue;
    }

    if (!originalEnvKeys.has(parsed.key) || process.env[parsed.key] === undefined) {
      process.env[parsed.key] = parsed.value;
    }
  }
}

for (const filename of [".env", ".env.local"]) {
  loadEnvFile(filename);
}
