# handle-async [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

Resolves any function to a value. Generators, callbacks, promises, flat values - don't worry about it!

Pass in any function, and we'll make sure you get the value how you need it.

## Install

```
npm install handle-async --save
```

## Example

Assume these input functions for the following examples:

```js
// good ol' function that returns a value
const flat = () => 123

// calling a callback with the value
const cb = (cb) => cb(null, 123)

// creating an async function that resolves the value
const asyncd = async () => 123

// a function that returns a promise with the resolved value
const promised = () => new Promise((reject, resolve ) => resolve(123))
```

### Callbacks

```js
import { callbackify } from 'handle-async'

callbackify(flat, (err, res) => console.log(res)) // 123
callbackify(cb, (err, res) => console.log(res)) // 123
callbackify(asyncd, (err, res) => console.log(res)) // 123
callbackify(promised, (err, res) => console.log(res)) // 123
```

### Promises

Same thing, but returning promises so you can use async await.

```js
import { promisify } from 'handle-async'

console.log(await promisify(flat)) // 123
console.log(await promisify(cb)) // 123
console.log(await promisify(asyncd)) // 123
console.log(await promisify(promised)) // 123
```

Same code, way different functions. Nice and easy.

[downloads-image]: http://img.shields.io/npm/dm/handle-async.svg
[npm-url]: https://npmjs.org/package/handle-async
[npm-image]: http://img.shields.io/npm/v/handle-async.svg

[travis-url]: https://travis-ci.org/contra/handle-async
[travis-image]: https://travis-ci.org/contra/handle-async.png?branch=master
