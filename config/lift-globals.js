const fs = require('node:fs/promises');

// API Extractor documents only what obsidian.d.ts exports, and its `declare global` block
// (createEl, Math.clamp, the DOM helpers...) exports nothing. This copies the block's
// declarations into an exported namespace so they get pages of their own.
// The original block stays in place, so the file still type-checks the same way.
// Every declaration in an ambient namespace is exported without the `export` keyword,
// so the signatures on the pages read the same as in obsidian.d.ts.
// `(global)` is not an identifier, so the namespace gets a placeholder name, which
// post-process.js renames to `(global)` in the pages, their folder and their links.

const FILE = './obsidian.d.ts';
const NAMESPACE = 'ObsidianGlobalScope';

async function main() {
	const source = await fs.readFile(FILE, 'utf8');
	const lines = source.split('\n');

	const start = lines.findIndex(line => line.trimEnd() === 'declare global {');
	if (start === -1) {
		throw new Error(`No "declare global {" line in ${FILE}`);
	}
	const end = lines.findIndex((line, index) => index > start && line.trimEnd() === '}');
	if (end === -1) {
		throw new Error(`The "declare global" block in ${FILE} is never closed`);
	}

	const lifted = [
		'/**',
		' * Everything Obsidian adds to the global scope. These are available everywhere without an import.',
		' * @public',
		' */',
		`export declare namespace ${NAMESPACE} {`,
		...lines.slice(start + 1, end),
		'}',
		''
	];

	await fs.writeFile(FILE, [...lines, ...lifted].join('\n'));
	console.log(`Lifted ${end - start - 1} lines of the global block into namespace ${NAMESPACE}`);
}

main();
