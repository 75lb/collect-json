var test = require('tape')
var collectJson = require('../')
var fs = require('fs')

test('.collectJson() - without args converts a JSON string to an object', function (t) {
  var stream = collectJson()

  stream.on('readable', function () {
    var chunk = this.read()
    if (chunk) {
      t.ok(Array.isArray(chunk))
      t.deepEqual(chunk, [ 1, 2, 3 ])
      t.end()
    }
  })
  stream.end('[ 1, 2, 3 ]')
})

test('.collectJson() with input that fails to JSON.parse', function (t) {
  t.plan(1)
  var stream = collectJson()

  stream.on('readable', function () {
    t.fail("'readable' should never fire")
  })
  stream.on('error', function () {
    t.pass('failed, as planned')
  })
  stream.end('asdfadsf')
})

test('.collectJson(throughFunc)', function (t) {
  t.plan(3)
  var stream = collectJson(function (data) {
    t.ok(Array.isArray(data))
    return data.concat(4)
  })

  stream.on('readable', function () {
    var chunk = this.read()
    if (chunk) {
      t.ok(Array.isArray(chunk))
      t.deepEqual(chunk, [ 1, 2, 3, 4 ])
    }
  })
  stream.end('[ 1, 2, 3 ]')
})

test.skip('.collectJson.async(throughFunc)', function (t) {
  var stream = collectJson.async(function (data, done) {
    process.nextTick(function () {
      t.ok(Array.isArray(data))
      done(data.concat(4))
    })
  })

  stream.on('readable', function () {
    var chunk = this.read()
    if (chunk) {
      t.ok(Array.isArray(chunk))
      t.deepEqual(chunk, [ 1, 2, 3, 4 ])
      t.end()
    }
  })
  stream.end('[ 1, 2, 3 ]')
})

test('big file', function (t) {
  fs.createReadStream('./test/fixture/big-file.json')
    .pipe(collectJson(function (data) {
      t.strictEqual(data.length, 731)
      t.end()
    }))
})
