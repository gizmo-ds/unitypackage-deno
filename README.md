# unitypackage-deno

## Usage

```typescript
import { unitypackage } from "https://deno.land/x/unitypackage/mod.ts";

const pkg = new unitypackage("./files");
await pkg.addFile("Cat.png", { root: "Assets/Images" });
await pkg.save("cute.unitypackage");
```

## License

Code is distributed under [MIT license](./LICENSE), feel free to use it in your proprietary projects as well.
