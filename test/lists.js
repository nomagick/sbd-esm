/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

let assert = require('assert');
let tokenizer = require('../lib/tokenizer');

describe('Lists', function () {

    describe('It should skip list enumeration', function () {
        let entry = "1. The item\n2. Another item";
        let sentences = tokenizer.sentences(entry, { "newline_boundaries": true });

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('It should skip alternative list enumeration', function () {
        let entry = "a. The item\nab. Another item\n(1.) Third item";
        let sentences = tokenizer.sentences(entry, { "newline_boundaries": true });

        it("should get 3 sentences", function () {
            assert.equal(sentences.length, 3);
        });
    });

    describe('It should keep empty list enumeration', function () {
        let entry = "a. The item\nzz.\nab.\ncd. Hello";
        let sentences = tokenizer.sentences(entry, { "newline_boundaries": true });

        it("should get 4 sentences", function () {
            assert.equal(sentences.length, 4);
        });
    });
});