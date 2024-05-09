import { FileSystemRouter } from '@bit-js/blitz';
import { Glob } from 'bun';
import watchSnippets from './snippets/build';

const publicDir = `${import.meta.dir}/public/`;
const glob = new Glob('**/*.html');

// Matching function
const router = new FileSystemRouter({
    on: Bun.file,
    scan: (dir) => glob.scanSync(dir)
});

const match = router.scan(publicDir);

// Reload snippets on change
watchSnippets(`${publicDir}scripts/snippets.js`);

// Serve
export default {
    fetch(req: Request) {
        const ctx = match(req);
        return new Response(ctx.result ?? Bun.file(publicDir + ctx.path));
    },

    error() {
        return new Response();
    }
}
