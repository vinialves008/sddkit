
import {
  access,
  cp,
  mkdir,
  readFile,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

export async function fileExists(
  targetPath: string,
): Promise<boolean> {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDirectory(
  directoryPath: string,
): Promise<void> {
  await mkdir(directoryPath, {
    recursive: true,
  });
}

export async function copy(
  source: string,
  destination: string,
  options?: {
    overwrite?: boolean;
  },
): Promise<void> {
  const overwrite = options?.overwrite ?? false;

  await ensureDirectory(path.dirname(destination));

  await cp(source, destination, {
    recursive: true,
    force: overwrite,
    errorOnExist: !overwrite,
  });
}

export async function readJson<T>(
  filePath: string,
): Promise<T> {
  const content = await readFile(filePath, "utf8");

  return JSON.parse(content) as T;
}

export async function writeJson(
  filePath: string,
  value: unknown,
): Promise<void> {
  await ensureDirectory(path.dirname(filePath));

  await writeFile(
    filePath,
    `${JSON.stringify(value, null, 2)}\n`,
    "utf8",
  );
}

export function resolveInsideProject(
  projectRoot: string,
  relativePath: string,
): string {
  const resolvedRoot = path.resolve(projectRoot);
  const resolvedTarget = path.resolve(
    resolvedRoot,
    relativePath,
  );

  const relative = path.relative(
    resolvedRoot,
    resolvedTarget,
  );

  if (
    relative.startsWith("..") ||
    path.isAbsolute(relative)
  ) {
    throw new Error(
      `Path escapes project root: ${relativePath}`,
    );
  }

  return resolvedTarget;
}
