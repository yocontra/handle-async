/*global it: true, describe: true */
/*eslint no-console: 0*/

import should from 'should'
import { promisify, callbackify } from '../src'

const flat = () => 123
const cb = (cb) => cb(null, 123)
const asyncd = async () => 123
const promised = () => new Promise((resolve, reject) => resolve(123))

describe('promisify', () => {
  it('should exist', async () => {
    should.exist(promisify)
  })
  it('should resolve flat', async () => {
    (await promisify(flat)).should.equal(123)
  })
  it('should resolve callbacks', async () => {
    (await promisify(cb)).should.equal(123)
  })
  it('should resolve async functions', async () => {
    (await promisify(asyncd)).should.equal(123)
  })
  it('should resolve promises', async () => {
    (await promisify(promised)).should.equal(123)
  })
})

describe('callbackify', () => {
  it('should exist', async () => {
    should.exist(callbackify)
  })
  it('should resolve flat', (done) => {
    callbackify(flat, (err, res) => {
      res.should.equal(123)
      done()
    })
  })
  it('should resolve callbacks', (done) => {
    callbackify(cb, (err, res) => {
      res.should.equal(123)
      done()
    })
  })
  it('should resolve async functions', (done) => {
    callbackify(asyncd, (err, res) => {
      res.should.equal(123)
      done()
    })
  })
  it('should resolve promises', (done) => {
    callbackify(promised, (err, res) => {
      res.should.equal(123)
      done()
    })
  })
})
