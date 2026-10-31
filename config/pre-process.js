const fs = require('fs/promises');

async function renameDuplicateFunctionReferences() {
	const configFile = await fs.readFile('./input/obsidian.api.json', 'utf8');
	const configuration = JSON.parse(configFile);
	await each(configuration.members);
	fs.writeFile('./input/obsidian.api.json', JSON.stringify(configuration));
}

async function each(members) {
	members.forEach(member => {

		if(member.docComment) {
			if(member.docComment.includes('getLeaf')) {
				const regex = /{@link Workspace.getLeaf(.*)}/g;
				member.docComment = member.docComment.replace(regex, '::Workspace.getLeaf::$1::')
			}
		}

		if(member.kind === 'Interface') {
			showCallSignatures(member);
		}

		if(member.members) {
			each(member.members);
		}
	})
}

// API Documenter lists no call or construct signatures, so an interface such as
// MarkdownPostProcessor would show only its properties. Put them in its signature block instead:
// export interface MarkdownPostProcessor {
//     (el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<any> | void;
// }
function showCallSignatures(member) {
	const signatures = member.members
		.filter(child => child.kind === 'CallSignature' || child.kind === 'ConstructSignature')
		.map(child => child.excerptTokens.map(token => token.text).join(''));
	if (signatures.length === 0) {
		return;
	}
	const body = signatures.map(signature => `    ${signature}\n`).join('');
	member.excerptTokens.push({ kind: 'Content', text: `{\n${body}}` });
}

async function main() {
	await renameDuplicateFunctionReferences();
}

main();
