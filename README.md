# Totem

## Architecture

### /app

The `app` directorcy contains to code and assets from the graphical user interface.

#### /app/assets

Those assets get delivered to the user and should already be or get optimized in the webpack production pipeline.

#### /app/src

The source of the Totem client. It gets shipped to the user, so the code should be fast enough for mobile devices. All dependencies must be able to run in the browser.

### /build

### /packages

Here are all packages not used in the Totem graphical interface build. You can import packages from `app/src`, from the `node_modules` and the packages node_modules `packages/package-name/node_modules`.

### /scripts

#### /scripts/browser-extension

#### /scripts/electron

### /tasks

### /tests

#### /test/app

## Development

If you want to work on Totem I suggest the following settings.
This is my preferred environment, if you use your own make sure to
have replacements for linting or other enhancements Totem supports.

### Requirements

* nodejs (Version 8)
* npm
* g++
* libpng-dev
* libusb-1.0-0-dev
* libudev-dev
* make
* rust

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

Totem provides snippets for fast development

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

#### Tests

## Contribute

### Code guidelines

## Sponsor

<img src="https://raw.githubusercontent.com/totem-network/totem/master/packages/docs/assets/sponsor/browserstack.png" width="256">

[Browserstack](https://www.browserstack.com/) lets us test Totem on different devices!

## License

License under GPL version 3 or any later version
