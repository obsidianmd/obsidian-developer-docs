# Obsidian Developer Docs

This repository contains the vault for the Obsidian Developer Docs.

A hosted version of this vault is available at <https://docs.obsidian.md/>.

## :arrow_down: Installation

How to install the documentation locally from the source:

1. Clone this repository using the following command :

```bash
git clone obsidianmd/obsidian-developer-docs
```

2. Go to the `config` folder and run the `gendoc.sh` script to generate the TypeScript API documentation generated.

```bash
cd obsidian-developer-docs/config && ./gendoc.sh
```

3. You should have the API documentation automatically generated in the `en/Reference/TypeScript API` folder.

> **Note**
> The `en/Reference/TypeScript API` folder is ignored by git as it is automatically generated.

Another way to install the documentation locally is to download it from the [releases page](https://github.com/obsidianmd/obsidian-developer-docs/releases).
