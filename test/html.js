/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

let assert = require('assert');
let tokenizer = require('../lib/tokenizer');

describe('HTML markup', function () {

    describe('HTML markup can be removed', function () {
        let entry = "<p>Hello this is my first sentence.</p> <br><br>There is also a second down the page.";
        let sentences = tokenizer.sentences(entry, { "sanitize": true });

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Non-markup is not interfered with', function () {
        let entry = "We find that a < b works. But in turn, c > x.";
        let sentences = tokenizer.sentences(entry, { "sanitize": false });

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
        it("should not be escaped", function () {
            assert(!/&lt;/.test(sentences[0]));
            assert(!/&gt;/.test(sentences[1]));
        });
    });


    describe('Closing html boundaries (br, p) split sentences.', function () {
        let entry = "What the Experts Say <br /> <p>In certain circumstances:</p> “working for a manager who’s task-oriented and has a high need for achievement can be motivating,” says Linda Hill";
        let sentences = tokenizer.sentences(entry, { sanitize: false, "html_boundaries": true });

        it("should get 3 sentences", function () {
            assert.equal(sentences.length, 3);
        });
    });

    describe('Closing html boundaries (div) split sentences.', function () {
        let entry = "<div>Lorem ipsum dolor sit amet, semper laoreet per.</div> <div>Dui pede donec, fermentum vivamus.</div> <div>Tellus vivamus ipsum.</div> <div>Elit eu nam.</div>";
        let sentences = tokenizer.sentences(entry, { sanitize: false, "html_boundaries": true });

        it("should get 4 sentences", function () {
            assert.equal(sentences.length, 4);
        });
    });

    describe('List items boundaries (li) split sentences.', function () {
        let entry = "<li>Lorem ipsum dolor sit amet, interdum nulla, ipsum id vivamus</li><li>Suspendisse pellentesque, porttitor alias</li><li>Nulla in lacus</li>";
        let sentences = tokenizer.sentences(entry, { sanitize: false, "html_boundaries": true, "html_boundaries_tags": ["li", "div"] });

        it("should get 3 sentences", function () {
            assert.equal(sentences.length, 3);
        });
    });
});
