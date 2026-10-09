import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  initializeProject,
  type AdapterDefinition,
} from "../../core/initializer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(
  __dirname,
  "../../..",
);

const templatesDirectory = path.join(
  __dirname,
  "templates",
);

const adapter: AdapterDefinition = {
  name: "claude",
  version: "0.1.0",

  sources: [
    {
      source: path.join(
        packageRoot,
        "dist",
        "templates",
        "sdd",
      ),
      destination: ".sdd",
    },

    {
      source: path.join(
        packageRoot,
        "dist",
        "templates",
        "commands",
      ),
      destination: ".sdd/commands",
    },

    {
      source: path.join(
        packageRoot,
        "dist",
        "templates",
        "templates",
      ),
      destination: ".sdd/templates",
    },

    {
      source: path.join(
        templatesDirectory,
        "skills",
      ),
      destination: ".claude/skills",
    },
  ],
};

export async function initClaude(
  projectRoot: string,
  sddkitVersion: string,
  options?: {
    force?: boolean;
  },
): Promise<void> {
  const result = await initializeProject({
    projectRoot,
    sddkitVersion,
    adapter,
    force: options?.force,
  });

  printResult(result);
}

function printResult(
  result: Awaited<
    ReturnType<typeof initializeProject>
  >,
): void {
  if (!result.initialized) {
    console.log(
      "SDDKit is already initialized in this project.",
    );

    console.log("");
    console.log(
      "Use --force if you want to overwrite managed files.",
    );

    return;
  }

  for (const file of result.created) {
    console.log(`✓ Created ${file}`);
  }

  for (const file of result.overwritten) {
    console.log(`✓ Updated ${file}`);
  }

  for (const file of result.skipped) {
    console.log(`○ Skipped ${file}`);
  }

  console.log("");
  console.log(
    "✓ SDDKit initialized successfully for Claude Code.",
  );
}