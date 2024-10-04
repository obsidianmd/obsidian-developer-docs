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

		if(member.members) {
			each(member.members);
		}
	})
}

async function main() {
	await renameDuplicateFunctionReferences();
}

main();
