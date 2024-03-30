import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('js', javascript);

const srcDir = import.meta.dir + '/src/';

const paths = new Bun.Glob('**/*.js').scanSync(srcDir);
const objParts = [];
const setting = { language: 'js' };

for (const name of paths)
    objParts.push(`${name.substring(0, name.length - 3)}:${JSON.stringify(
        `<code class='language-javascript hljs'>${hljs.highlight(await Bun.file(srcDir + name).text(), setting).value}</code>`
    )}`);

const target = './public/scripts/snippets.js';
Bun.write(target, `var snippets={${objParts.join()}};for(const e of document.querySelectorAll('pre[data-snippet]'))e.innerHTML = snippets[e.dataset.snippet];`)
