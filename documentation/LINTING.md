# Linting and Formatting

## Requirements

- [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) `DavidAnson.vscode-markdownlint`

  - Markdownlint must be installed as an extension for local markdown linting to work within VS Code or Cursor on save.
  - Or run in directly using [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2).

    ```sh
    markdownlint-cli2 "**/*.md"

This will help ensure the code base is consistent and will help eliminate some merge request conflicts.

## Configuration

MarkdownLint uses [`.markdownlint-cli2.jsonc`](../.markdownlint-cli2.jsonc) to configure the markdown linting rules and to ignore linting for specific files and paths.
