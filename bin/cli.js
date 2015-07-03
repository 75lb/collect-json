#!/usr/bin/env node
"use strict";
var collectJson = require("../");

var throughFunction = new Function(process.argv[2]);

process.stdin
    .pipe(collectJson(throughFunction))
    .pipe(process.stdout);
