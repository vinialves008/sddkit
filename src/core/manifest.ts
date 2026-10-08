import path from "node:path";

import {
  fileExists,
  readJson,
  writeJson,
} from "./filesystem.js";

export const SDDKIT_DIRECTORY = ".sddkit";
export const MANIFEST_FILENAME = "manifest.json";

export interface SddKitManifest {
  sddkit: {
    version: string;
  };

  adapter: {
    name: string;
    version: string;
  };
}

export function getManifestPath(
  projectRoot: string,
): string {
  return path.join(
    projectRoot,
    SDDKIT_DIRECTORY,
    MANIFEST_FILENAME,
  );
}

export async function readManifest(
  projectRoot: string,
): Promise<SddKitManifest | null> {
  const manifestPath = getManifestPath(projectRoot);

  if (!(await fileExists(manifestPath))) {
    return null;
  }

  try {
    return await readJson<SddKitManifest>(
      manifestPath,
    );
  } catch {
    throw new Error(
      `Invalid SDDKit manifest: ${manifestPath}`,
    );
  }
}

export async function writeManifest(
  projectRoot: string,
  manifest: SddKitManifest,
): Promise<void> {
  await writeJson(
    getManifestPath(projectRoot),
    manifest,
  );
}
