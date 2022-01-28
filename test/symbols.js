/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

let assert = require('assert');
let tokenizer = require('../lib/tokenizer');

describe('Sentences with symbols', function () {

    describe('It should skip numbers', function () {
        let entry = "10 times 10 = 10.00^2. 13.000 14.50 and 14,000,000.50";
        let sentences = tokenizer.sentences(entry);

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('It should skip urls and emails', function () {
        let entry = "Search on http://google.com. Then send me an email: fabien@somedomain.com or fabien@anotherdomain.cc";
        let sentences = tokenizer.sentences(entry);

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('It should skip phone numbers', function () {
        let entry = "Call +44.3847838 for whatever.";
        let sentences = tokenizer.sentences(entry);

        it("should get 1 sentence", function () {
            assert.equal(sentences.length, 1);
        });
    });

    describe('It should skip money with currency indication', function () {
        let entry = "I paid €12.50 for that CD. Twelve dollars and fifty cent ($12.50). Ten pounds - £10.00 it is fine.";
        let sentences = tokenizer.sentences(entry);

        it("should get 1 sentence", function () {
            assert.equal(sentences.length, 3);
        });
    });

    describe('Newlines/paragraph must be enabled to end sentences', function () {
        let entry = "The humble bundle sale\r\nDate: Monday-Fri starting 2015-01-01";
        let sentences = tokenizer.sentences(entry);

        it("should get 1 sentences", function () {
            assert.equal(sentences.length, 1);
        });
    });

    describe('Newlines/paragraph enabled ends sentences', function () {
        let entry = "The humble bundle sale\r\nDate: Monday-Fri starting 2015-01-01\nSales starting at ¤2,50";
        let sentences = tokenizer.sentences(entry, { "newline_boundaries": true });

        it("should get 3 sentences", function () {
            assert.equal(sentences.length, 3);
        });
    });
});