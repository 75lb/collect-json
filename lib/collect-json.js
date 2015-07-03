"use strict";
var t = require("typical");
var connect = require("stream-connect");
var through = require("stream-via");
var collect = require("collect-all");

/**
@module collect-json

*/
module.exports = collectJson;
collectJson.async = collectJsonAsync;

/**
Returns a stream which will become readable with a single JSON object all input is received. Throws if invalid JSON is received.

@return {external:Duplex}
@alias module:collect-json
@example 
process.stdin
    .pipe(collectJson(function(json){
        json.received = true;
        return json;
    }))
    .on("error", function(err){
        // input from stdin failed to parse
    })
    .pipe(process.stdout);
*/
function collectJson(throughFunction, options){
    if (t.isPlainObject(throughFunction) && !t.isDefined(options)){
        options = throughFunction;
    }
    options = options || {};
    var stream = collect({
        through: function(data){
            try {
                var json = JSON.parse(data);
            } catch(err){
                err.input = data;
                err.message = "Error parsing input JSON: " + err.message;
                throw err;
            }
            return json;
        },
        objectMode: true
    });
    if (throughFunction){
        return connect(stream, through(throughFunction, { objectMode: true }));
    } else {
        return stream;
    }
}

function collectJsonAsync(throughFunction, options){
}
