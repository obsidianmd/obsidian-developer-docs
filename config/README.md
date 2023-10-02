# API Extractor

Using the [API Extractor](https://api-extractor.com/), we generate the reference documentation for the Obsidian TypeScript API.

> [!note]
> This folder maintains unchanged copies of the following files from the [obsidianmd/obsidian-api](https://github.com/obsidianmd/obsidian-api):
>
> - `obsidian.d.ts`
> - `package.json`
>
> To update the reference docs, you must first sync these files with the original. To avoid maintaining copies, we should consider moving the `api-extractor.json` file to [obsidianmd/obsidian-api](https://github.com/obsidianmd/obsidian-api) and add the repository as a Git submodule for this repository.

## Generate docs

1. In your terminal, change your working directory to `config`:

   ```bash
   cd config
   ```

2. Generate the `.api.json` file. The following command generates `./input/obsidian.api.json`.

   ```bash
   api-extractor run --local --verbose
   ```

3. Generate Markdown docs. The following command generates Markdown docs from the `.api.json` file.

   ```bash
   api-documenter markdown --output ../en/Reference/TypeScript\ API
   ```
