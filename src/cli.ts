#!/usr/bin/env node

import { Command } from "commander";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { registerInitCommand } from "./commands/init.js";

interface PackageJson {
  version: string;
}

async function getPackageVersion(): Promise<string> {
  const packageJsonPath = path.resolve(
    path.dirname(
      fileURLToPath(import.meta.url),
    ),
    "../package.json",
  );

  const content = await readFile(
    packageJsonPath,
    "utf8",
  );

  const packageJson =
    JSON.parse(content) as PackageJson;

  return packageJson.version;
}

async function main(): Promise<void> {
  const version = await getPackageVersion();

  const program = new Command();

  program
    .name("sddkit")
    .description(
      "Specification-Driven Development toolkit for AI coding agents",
    )
    .version(version);

  registerInitCommand(
    program,
    version,
  );

  await program.parseAsync();
}

main().catch((error: unknown) => {
  const message =
    error instanceof Error
      ? error.message
      : String(error);

  console.error(`\nError: ${message}\n`);

  process.exitCode = 1;
});
