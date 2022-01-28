/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

let assert = require('assert');
let tokenizer = require('../lib/tokenizer');

describe('Save newlines', function () {

    describe('Basic', function () {
        let entry = "First sentence... Another list: \n - green \n - blue \n - red";
        let sentences = tokenizer.sentences(entry);

        it('second sentence should have newlines', function () {
            assert.equal(sentences[1], "Another list: \n - green \n - blue \n - red");
        });
    });

    describe('Sentence without lists', function () {
        let entry = "First sentence... Another sentence.\nThis is a new paragraph.";
        let sentences = tokenizer.sentences(entry);

        it('second sentence should have newlines', function () {
            assert.equal(sentences.length, 3);
        });
    });

    describe('With option to use newlines as sentence boundaries', function () {
        let entry = "First sentence... Another list: \n - green \n - blue \n - red";
        let sentences = tokenizer.sentences(entry, { "newline_boundaries": true });

        it('second sentence should have newlines', function () {
            assert.equal(sentences.length, 5);
        });
    });


    describe('Multiline strings', function () {
        let entry = "How now brown cow.\
        \
        Peter Piper Picked a peck of pickled peppers. A peck of pickled peppers peter piper picked.";

        let sentences = tokenizer.sentences(entry);

        it('Should have 3 sentences ending in periods', function () {
            assert.equal(sentences[0], "How now brown cow.");
            assert.equal(sentences[1], "Peter Piper Picked a peck of pickled peppers.");
        });
    });


    describe('Template multiline strings', function () {
        let entry = `How now brown cow.

        Peter Piper Picked a peck of pickled peppers. A peck of pickled peppers peter piper picked.`;

        let sentences = tokenizer.sentences(entry, { "newline_boundaries":  true });

        it('Should have 3 sentences ending in periods', function () {
            assert.equal(sentences[0], "How now brown cow.");
            assert.equal(sentences[1], "Peter Piper Picked a peck of pickled peppers.");
        });
    });
});
