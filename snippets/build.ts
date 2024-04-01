import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

import { watch } from 'fs';

hljs.registerLanguage('js', javascript);

const srcDir = import.meta.dir + '/src';

const highlightSettings = { language: 'js' };
const watchSettings = { recursive: true };

const paths = new Bun.Glob('**/*.js');

// Get the ID of a file name
function getID(filename: string) {
    // Slice .js
    return filename.substring(0, filename.length - 3);
}

// Return the highlighted HTML of the file content
const srcWithSlash = srcDir + '/';
async function highlightFile(filename: string) {
    return `<code class='language-javascript' hljs'>${hljs.highlight(await Bun.file(srcWithSlash + filename).text(), highlightSettings).value}</code>`;
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

    return watch(srcDir, watchSettings, async (event, name) => {
        if (name === null) return;
        console.log('Rebuilding snippets...');
        console.log('Event:', event);
        console.log('File:', name);

        // Only change one property and rewrite the file content
        if (event === 'change') obj[getID(name)] = await highlightFile(name);
        // Rebuild the entire directory
        else await build(obj);

        Bun.write(out, code(obj));

    });
}
