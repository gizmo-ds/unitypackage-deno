# unitypackage-deno

![Deno](https://img.shields.io/badge/-Deno-4f4f4f?logo=deno&style=flat)
![Latest tag](https://img.shields.io/github/v/tag/gizmo-ds/unitypackage-deno?label=latest)
[![License](https://img.shields.io/github/license/gizmo-ds/unitypackage-deno)](./LICENSE)

## Usage

```typescript
import { unitypackage } from "https://deno.land/x/unitypackage/mod.ts";

const pkg = new unitypackage("./files");
await pkg.addFile("Cat.png", { root: "Assets/Images" });
await pkg.save("cute.unitypackage");
```

## License

Code is distributed under [MIT license](./LICENSE), feel free to use it in your proprietary projects as well.
