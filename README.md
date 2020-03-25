# neat-tap [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/neat-tap/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/neat-tap)

Fast and simple TAP parser.

[![NPM Badge](https://nodei.co/npm/neat-tap.png)](https://npmjs.com/package/neat-tap)

## Install

```sh
npm install neat-tap
```

## Usage

```js
const neatTap = require("neat-tap");

const tapData = `
1..4
ok 1 - A
not ok 2 - B
ok 3 - C
not ok 4 - D
`;

(async () => {
	await neatTap(tapData);
	//=> { version: undefined, ok: false ... }
})();
```

## CLI Usage

```sh
$ tap test.js | neat-tap
{ version: undefined, ok: false ... }
```

## API

### neatTap(data, options?)

#### data

Type: `string | Buffer | ReadableStream`

The TAP data to parse.

#### options

Type: `object`

##### strict

Type: `boolean`\
Default: `true`

Whether to fail when provided with non-TAP data.

##### bail

Type: `boolean`\
Default: `false`

Whether to stop parsing when a bail line is hit.

##### omitVersion

Type: `boolean`\
Default: `false`

Ignore TAP version lines.
