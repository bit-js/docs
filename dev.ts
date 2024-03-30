import { Byte, send } from '@bit-js/byte';
import { Glob } from 'bun';

import "./snippets/build";

const publicDir = `${import.meta.dir}/public/`;
const dirLen = publicDir.length;

const app = new Byte();

// Serve html
const paths = new Glob('**/*.html').scanSync({
    absolute: true,
    onlyFiles: true,
    cwd: publicDir
});

for (const path of paths) app.any(
    path.endsWith('index.html')
        ? path.substring(dirLen, path.length - 10)
        : path.substring(dirLen, path.length - 5),

    () => send.body(Bun.file(path))
);


// Serve assets
app.fallback((ctx) => send.body(Bun.file(publicDir + ctx.path)));

// Serve with Bun
Bun.serve({
    fetch: app.fetch,
    error: () => new Response()
});
