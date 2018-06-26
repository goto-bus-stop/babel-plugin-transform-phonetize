# babel-plugin-transform-phonetize

babel plugin to rename identifiers in a file to randomly generated pronounceable names

Useful for deobfuscation.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/babel-plugin-transform-phonetize.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/babel-plugin-transform-phonetize
[travis-image]: https://img.shields.io/travis/goto-bus-stop/babel-plugin-transform-phonetize.svg?style=flat-square
[travis-url]: https://travis-ci.org/goto-bus-stop/babel-plugin-transform-phonetize
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install babel-plugin-transform-phonetize
```

## Usage

```json
{
  "plugins": [
    ["transform-phonetize", {
      "maxLength": 4,
      "except": ["idx"]
    }]
  ]
}
```

## Options

* `maxLength` - Maximum length of the original identifier name. Only names shorter than this length will be renamed.
  This way variables that already have meaningful names will not be touched. Defaults to `3`.
* `except` - Array of identifier names not to rename.

## License

[Apache-2.0](LICENSE.md)
