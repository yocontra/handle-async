const once = require('once')

// takes a function or a flat value and returns the resolved value to the callback
// if a fn, it must return a flat value, a promise, or pass something to a callback
const callbackify = (fn, cb) => {
  // flat value
  if (typeof fn !== 'function') return cb(null, fn)

  const wrapped = once(cb)

  // call fn w callback
  let res
  try {
    res = fn(wrapped)
  } catch (err) {
    return wrapped(err)
  }

  // using a callback, itll call with a response
  if (typeof res === 'undefined') return

  // using a promise
  if (res != null && typeof res === 'object' && typeof res.then === 'function') {
    res.then((data) => {
      wrapped(null, data)
      return null
    }).catch((err) => {
      wrapped(err)
      return null
    })
    return
  }

  // returned a plain value
  wrapped(null, res)
}

const promisify = (fn) =>
  new Promise((resolve, reject) => {
    callbackify(fn, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })


module.exports = { callbackify, promisify }
