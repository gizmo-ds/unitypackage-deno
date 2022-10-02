import { join } from "https://deno.land/std@0.158.0/path/mod.ts";
import { Tar } from "https://deno.land/std@0.158.0/archive/tar.ts";
import { Buffer } from "https://deno.land/std@0.158.0/io/buffer.ts";
import { copy } from "https://deno.land/std@0.158.0/streams/conversion.ts";
import { parse as parseYAML } from "https://deno.land/std@0.158.0/encoding/yaml.ts";
import { gzipSync } from "https://cdn.skypack.dev/fflate@0.7.4";

interface Meta {
  guid: string;
}

export interface FileOptions {
  root?: string;
}

export class unitypackage {
  private tar: Tar;

  constructor(private path: string) {
    this.tar = new Tar();
  }

  public async addFile(filename: string, options?: FileOptions) {
    const root = options?.root ?? "Assets";
    const _filename = join(this.path, filename);
    const _metafile = _filename + ".meta";
    const meta = parseYAML(await Deno.readTextFile(_metafile)) as Meta;
    const pathname = new TextEncoder().encode(
      join(root, filename).replaceAll("\\", "/")
    );
    await this.tar.append([meta.guid, "pathname"].join("/"), {
      reader: new Buffer(pathname),
      contentSize: pathname.byteLength,
    });
    await this.tar.append([meta.guid, "asset"].join("/"), {
      filePath: _filename,
    });
    await this.tar.append([meta.guid, "asset.meta"].join("/"), {
      filePath: _metafile,
    });
  }
  public async addFiles(files: string[], options?: FileOptions) {
    await Promise.all(
      files.map(async (file) => {
        await this.addFile(file, options);
      })
    );
  }

  public async getData() {
    const buf = new Buffer();
    await copy(this.tar.getReader(), buf);
    return gzipSync(buf.bytes(), {
      filename: "archtemp.tar",
      level: 9,
    }) as Uint8Array;
  }

  public async save(filename: string) {
    await Deno.writeFile(filename, await this.getData());
  }
}
