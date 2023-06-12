# Template for creating Electron applications integrating React and SCSS

Framwork GPT is an open-source project aiming to create projects for system design and development with GPT assistance.

This project is a desktop application built with Electron, React, and SCSS.

It's a very recent project and is not yet functional.

## Prerequisites

To develop or build this project, you will need Node.js (>= 18.16.0) and npm installed on your machine.
Installation

Clone this repository on your local machine and install the dependencies with npm:

```bash
git clone https://github.com/Ecth3li0n/Framwork-GPT
cd Framwork-GPT
npm install
```

## Development

To start the application in development mode, run:

```bash
npm start
```

This starts Webpack in "watch" mode and launches Electron. The application will be automatically reloaded every time you modify a source file.

## Build

To compile the application for production, run:

```bash
npm run build
```

This produces an optimized JavaScript bundle for production in the dist directory.

## Packaging

To package the application for distribution, run the command corresponding to the target platform:

* Windows : npm run package-win
* macOS : npm run package-mac
* Linux : npm run package-linux

Each command produces a directory with the packaged application for the specified platform.

## Contributions

This project is open to contributions. If you wish to contribute, you can fork the project and propose a pull request.
However, I don't have a lot of time these days, so it might take a while.

Thank you all!

### Contributing

We welcome contributions from everyone. Here are a few guidelines to help you get started:

1. Branch Naming Conventions: We use GitFlow naming conventions for branch names. Here are some examples:
    * feature/<feature-name> for new features.
    * bugfix/<bug-name> for bug fixes.
    * hotfix/<hotfix-name> for urgent fixes on the main branch.
    * release/<version> for preparing new production releases.

2. Commit Messages: Use clear and informative commit messages. Structure your commit messages as follows:
    * Use the present imperative ("change", "update", "add"... etc) for your verb.
    * The first line is a brief (< 50 characters) summary of the changes.
    * Then, leave a blank line.
    * Finally, provide a more detailed description of the changes if necessary.

For example:

```
Update README with contribution guidelines

This commit adds a new section to the README about how contributors should submit their changes to the project. It includes information about the branch naming conventions and the commit message formatting.
```

3. Pull Requests: When a feature or fix is completed on a branch, use a Pull Request (PR) to merge the changes into the dev branch. This gives everyone a chance to review the changes before they are merged into dev.
Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

Happy coding!

## License

Copyright (c) 2023 Ecth3li0n
Framwork GPT is released under MIT License.
See file LICENCE.txt for full license details.
