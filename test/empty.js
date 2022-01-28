/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

let assert = require('assert');
let tokenizer = require('../lib/tokenizer');

describe('Empty', function () {

  describe('string', function () {
      let entry = "";
      let sentences = tokenizer.sentences(entry);

      it('should not get a sentence', function () {
          assert.equal(sentences.length, 0);
      });

      entry = "            \n\n                 ";
      sentences = tokenizer.sentences(entry);

      it('should not get a sentence from whitespace', function () {
          assert.equal(sentences.length, 0);
      });

  });

  describe('undefined', function () {
      let sentences = tokenizer.sentences();

      it('should not get a sentence', function () {
          assert.equal(sentences.length, 0);
      });
  });

  describe('non string', function () {
      let entry = [];
      let sentences = tokenizer.sentences(entry);

      it('should not get a sentence from array', function () {
          assert.equal(sentences.length, 0);
      });

      entry = {};
      sentences = tokenizer.sentences(entry);

      it('should not get a sentence from object', function () {
          assert.equal(sentences.length, 0);
      });
  });

  describe('symbols only', function () {
      let entry = "^&%(*&";
      let sentences = tokenizer.sentences(entry);

      it('should not single entry', function () {
          assert.equal(sentences.length, 1);
      });
  });

});