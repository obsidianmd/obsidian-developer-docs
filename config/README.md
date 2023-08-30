# API Extractor

We generate the reference documentation for the `obsidian` TypeScript API using the [API Extractor](https://api-extractor.com/).

> [!NOTE]
> This folder is linked to the [obsidianmd/obsidian-api](https://github.com/obsidianmd/obsidian-api) package via the `package.json` file.
> It automatically retrieves the package with all its files and allows to generate the reference documentation.

## Generate docs

### Manually

> [!IMPORTANT]
> You should use the `api-documenter` from the forked repository for Obsidian needs.
> You can find a version of this [here](https://github.com/LBF38/rushstack-obsidian).
> A GitHub Package is present for easy installation.
>
> The `api-extractor` comes from the official repository (`@microsoft/api-extractor`).

1. In your terminal, change your working directory to `config`:

   ```bash
   cd config
   ```

2. Generate the .api.json file. The following command generates `./input/obsidian.api.json`.

   ```bash
   api-extractor run --local --verbose
   ```

3. Generate Markdown docs. The following command generates Markdown docs from the .api.json file.

   ```bash
   api-documenter markdown --output ../en/Reference/TypeScript\ API
   ```

### Automatically

You can use the `gendoc.sh` script to generate the documentation automatically.

```bash
cd config && ./gendoc.sh
```

> [!NOTE]
> The script runs approximately 3-5 minutes before completion.
