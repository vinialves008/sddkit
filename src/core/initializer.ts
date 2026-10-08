import path from "node:path";

import {
  copy,
  ensureDirectory,
  fileExists,
  resolveInsideProject,
} from "./filesystem.js";

import {
  readManifest,
  writeManifest,
  type SddKitManifest,
} from "./manifest.js";

export interface InitializationSource {
  /**
   * Arquivo ou diretório que será copiado.
   */
  source: string;

  /**
   * Caminho relativo ao projeto de destino.
   */
  destination: string;
}

export interface AdapterDefinition {
  name: string;
  version: string;
  sources: InitializationSource[];
}

export interface InitializeOptions {
  projectRoot: string;
  sddkitVersion: string;
  adapter: AdapterDefinition;

  /**
   * Permite substituir arquivos existentes.
   *
   * Não remove arquivos que não fazem parte
   * da instalação.
   */
  force?: boolean;
}

export interface InitializationResult {
  initialized: boolean;
  created: string[];
  overwritten: string[];
  skipped: string[];
}

export async function initializeProject(
  options: InitializeOptions,
): Promise<InitializationResult> {
  const {
    projectRoot,
    sddkitVersion,
    adapter,
    force = false,
  } = options;

  const existingManifest = await readManifest(
    projectRoot,
  );

  if (existingManifest && !force) {
    return {
      initialized: false,
      created: [],
      overwritten: [],
      skipped: adapter.sources.map(
        (source) => source.destination,
      ),
    };
  }

  const result: InitializationResult = {
    initialized: true,
    created: [],
    overwritten: [],
    skipped: [],
  };

  for (const source of adapter.sources) {
    const destination = resolveInsideProject(
      projectRoot,
      source.destination,
    );

    const exists = await fileExists(destination);

    if (exists && !force) {
      result.skipped.push(source.destination);
      continue;
    }

    await ensureDirectory(
      path.dirname(destination),
    );

    await copy(source.source, destination, {
      overwrite: force,
    });

    if (exists) {
      result.overwritten.push(
        source.destination,
      );
    } else {
      result.created.push(
        source.destination,
      );
    }
  }

  const manifest: SddKitManifest = {
    sddkit: {
      version: sddkitVersion,
    },

    adapter: {
      name: adapter.name,
      version: adapter.version,
    },
  };

  await writeManifest(
    projectRoot,
    manifest,
  );

  return result;
}
