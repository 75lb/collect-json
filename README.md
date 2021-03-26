[![view on npm](https://badgen.net/npm/v/collect-json)](https://www.npmjs.org/package/collect-json)
[![npm module downloads](https://badgen.net/npm/dt/collect-json)](https://www.npmjs.org/package/collect-json)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/collect-json)](https://github.com/75lb/collect-json/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/collect-json)](https://github.com/75lb/collect-json/network/dependents?dependent_type=PACKAGE)
[![Build Status](https://travis-ci.org/75lb/collect-json.svg?branch=master)](https://travis-ci.org/75lb/collect-json)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# collect-json

***DEPRECATED: Please use [stream-read-all](https://github.com/75lb/stream-read-all) instead.***

<a name="module_collect-json"></a>

## collect-json
Returns a stream which becomes readable with a single value once all (valid) JSON is received.

<a name="exp_module_collect-json--collectJson"></a>

### collectJson([callback]) ⇒ [<code>Duplex</code>](https://nodejs.org/api/stream.html#stream_class_stream_duplex) ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | called with the collected json data, once available. The value returned by the callback will be passed downstream. |

**Example**  
An example command-line client script - JSON received at stdin is stamped with `received` then written to stdout.
```js
var collectJson = require("collect-json")

process.stdin
    .pipe(collectJson(function(json){
        json.received = true
        return JSON.stringify(json)
    }))
    .on("error", function(err){
        // input from stdin failed to parse
    })
    .pipe(process.stdout)
```

* * *

&copy; 2015-21 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
