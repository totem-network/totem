# Totem

## Development

If you want to contribute to Totem I suggest the following settings.
This is my preferred environment, if you use your own make sure to
have replacements for linting or other enhancements Totem supports.

### Dependencies

* nodejs (Version 8)
* npm
* g++
* libpng-dev
* make

### Visual Studio Code

With those plugins coding for Totem is a pleasure :)

Recommended:

* node-readme (bengreenier.vscode-node-readme)
* Beautify (hookyqr.beautify)
* Debugger for Chrome (msjsdiag.debugger-for-chrome)
* GitLens (eamodio.gitlens)
* solidity (juanblanco.solidity)
* gitignore (codezombiech.gitignore)
* Markdown All in One (yzhang.markdown-all-in-one)
* TSLint (eg2.tslint)
* markdownlint (davidanson.vscode-markdownlint)

Optional:

* vscode-icons (robertohuertasm.vscode-icons)

We provide snippets for fast development

### Getting started

After you setup the development environment, clone this repository

    git clone https://git.totem.network/totem/totem.git
    cd totem

Install the npm dependencies

    npm install

#### Electron

If you want to develop with electron

    npm run serve:electron

Thats it!

#### Browser

If you want to work on the web version. (You can access Totem
on [https://localhost:8080](https://localhost:8080))

    npm run serve:web

To develop the browser extension you can run

    npm run webextension:dev:chrome # for chrome
    npm run webextension:dev:firefox # for firefox

#### Ethereum
