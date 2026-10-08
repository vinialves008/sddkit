import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const distPath = path.join(projectRoot, "dist");

const sources = [
  {
    source: path.join(
      projectRoot,
      "templates",
      "sdd",
    ),
    destination: path.join(
      distPath,
      "templates",
      "sdd",
    ),
  },
  {
    source: path.join(
      projectRoot,
      "templates",
      "commands",
    ),
    destination: path.join(
      distPath,
      "templates",
      "commands",
    ),
  },
  {
    source: path.join(
      projectRoot,
      "templates",
      "templates",
    ),
    destination: path.join(
      distPath,
      "templates",
      "templates",
    ),
  },
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
];

for (const { source, destination } of sources) {
  await mkdir(destination, {
    recursive: true,
  });

  await cp(source, destination, {
    recursive: true,
    force: true,
  });
}

console.log("✓ Templates copied to dist");