import type { Command } from "commander";

import { initVscode } from "../adapters/vscode/index.js";
import { initClaude } from "../adapters/claude/index.js";

export interface InitOptions {
  force?: boolean;
}

export function registerInitCommand(
  program: Command,
  sddkitVersion: string,
): void {
  program
    .command("init")
    .description(
      "Initialize SDDKit in the current project",
    )
    .argument(
      "<adapter>",
      "Target environment (e.g. vscode)",
    )
    .option(
      "-f, --force",
      "Overwrite existing SDDKit files",
    )
    .action(
      async (
        adapter: string,
        options: InitOptions,
      ) => {
        const projectRoot = process.cwd();

        switch (adapter.toLowerCase()) {
          case "vscode":
            await initVscode(
              projectRoot,
              sddkitVersion,
              {
                force: options.force,
              },
            );
            break;

          case "claude":
            await initClaude(
              projectRoot,
              sddkitVersion,
              {
                force: options.force,
              },
            );
            break;

          default:
            throw new Error(
              `Unknown adapter "${adapter}". ` +
                `Available adapters: vscode, claude`,
            );
        }
      },
    );
}
