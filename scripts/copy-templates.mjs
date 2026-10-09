import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const distPath = path.join(projectRoot, "dist");

const sources = [
  // Templates universais do SDDKit
  {
    source: path.join(projectRoot, "templates", "sdd"),
    destination: path.join(distPath, "templates", "sdd"),
  },
  {
    source: path.join(projectRoot, "templates", "commands"),
    destination: path.join(distPath, "templates", "commands"),
  },
  {
    source: path.join(projectRoot, "templates", "templates"),
    destination: path.join(distPath, "templates", "templates"),
  },

  // Skills do VS Code
  {
    source: path.join(
      projectRoot,
      "src",
      "adapters",
      "vscode",
      "templates",
    ),
    destination: path.join(
      distPath,
      "adapters",
      "vscode",
      "templates",
    ),
  },

  // Skills do Claude Code
  {
    source: path.join(
      projectRoot,
      "src",
      "adapters",
      "claude",
      "templates",
    ),
    destination: path.join(
      distPath,
      "adapters",
      "claude",
      "templates",
    ),
  },
];

for (const { source, destination } of sources) {
  await mkdir(path.dirname(destination), {
    recursive: true,
  });

  await cp(source, destination, {
    recursive: true,
    force: true,
  });
}

console.log("✓ Templates and adapter skills copied to dist");