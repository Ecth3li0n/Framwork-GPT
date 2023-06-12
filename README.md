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

## License

Copyright (c) 2023 Ecth3li0n
Framwork GPT is released under MIT License.
See file LICENCE.txt for full license details.