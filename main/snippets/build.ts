import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

import { watch } from 'fs';

hljs.registerLanguage('js', javascript);

const srcDir = import.meta.dir + '/src/';
const watchSettings = { recursive: true };

const paths = new Bun.Glob('**/*');

// Get the ID of a file name
function getID(filename: string) {
    // Slice .js
    return filename.substring(0, filename.lastIndexOf('.'));
}

// Return the highlighted HTML of the file content
async function highlightFile(filename: string) {
    return `<code class='hljs'>${hljs.highlightAuto(await Bun.file(srcDir + filename).text()).value}</code>`;
}

// Search and build files
async function build(obj: Dict<string>) {
    for (const name of paths.scanSync(srcDir)) {
        console.log('Snippet:', name);
        obj[getID(name)] = await highlightFile(name);
    }
}

// Return the generated JS code
function code(obj: Dict<string>) {
    return `const snippets=${JSON.stringify(obj)};for(const e of document.querySelectorAll('pre[data-snippet]'))e.innerHTML=snippets[e.dataset.snippet];`;
}

// Watch the snippets directory
export default async function watchSnippets(out: string) {
    const obj: Dict<string> = {};

    await build(obj);
    Bun.write(out, code(obj));

    return watch(srcDir, watchSettings, async () => {
        await build(obj);
        Bun.write(out, code(obj));
    });
}
