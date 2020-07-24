# Laravel Mix Hash Length

[![Software License](https://img.shields.io/npm/l/laravel-mix-hash-length.svg)](LICENSE)
[![Latest Version on NPM](https://img.shields.io/npm/v/laravel-mix-hash-length.svg)](https://npmjs.com/package/laravel-mix-hash-length)

[Laravel Mix](https://github.com/JeffreyWay/laravel-mix) extension for globally adjusting hash length.

- Before: `main.js?c37511d80442057e`, `font.woff?1c0ecbb4c37511d8`
- After: `main.js?c375`, `font.woff?1c0e`

## Installation

```bash
npm install laravel-mix-hash-length
```

## Usage

Require the extension inside your `webpack.mix.js` and call `hashLength()` with the desired hash length as only argument.

```js
const mix = require('laravel-mix')
require('laravel-mix-hash-length')

mix.hashLength(4)  // main.js?c375
mix.hashLength(6)  // main.js?c3751c
mix.hashLength(10) // main.js?c37511d804
```

## Options

The extension takes a single argument: the desired hash length.
