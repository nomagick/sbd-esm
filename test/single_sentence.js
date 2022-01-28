/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

let assert = require('assert');
let tokenizer = require('../lib/tokenizer');

describe('Single sentences', function () {
  describe('Basic', function () {
      let entry = "First sentence.";
      let sentences = tokenizer.sentences(entry);

      it('should get one sentence', function () {
          assert.equal(sentences.length, 1);
      });
  });

  describe('Skip ellipsis', function () {
      let entry = "First sentence... another sentence";
      let sentences = tokenizer.sentences(entry);

      it('should get one sentence', function () {
          assert.equal(sentences.length, 1);
      });
  });

  describe('Difficult single sentence (A)', function () {
      let entry = "On Jan. 20, former Sen. Barack Obama became the 44th President of the U.S.";
      let sentences = tokenizer.sentences(entry);

      it('should get one sentence', function () {
          assert.equal(sentences.length, 1);
      });
  });

  describe('Difficult sentence (B)', function () {
      let entry = "It happened around 5:30 p.m. in the 500 block of W. 82nd St. Investigators say Terrence Taylor, 22, and Deontrell Sloan, 17, got into an argument over money during the game.";
      let sentences = tokenizer.sentences(entry);

      it('should get 1 sentence', function () {
          assert.equal(sentences.length, 1);
      });
  });

  describe('Difficult sentence (C)', function () {
      let entry = "GARY Mayor Scott L. King has declared a 'cash crisis' and has asked city department heads to put off all non-essential spending until June.";
      let sentences = tokenizer.sentences(entry);

      it('should get 1 sentence', function () {
          assert.equal(sentences.length, 1);
      });
  });

  describe('Difficult sentence (D)', function () {
      let entry = "HOWELL, Mich. - Blissfield was only nine outs away from ending the longest winning streak";
      let sentences = tokenizer.sentences(entry);

      it('should get 1 sentence', function () {
          assert.equal(sentences.length, 1);
      });
  });

  describe('Difficult sentence (E)', function () {
      let entry = "33 FORT LAUDERDALE U.S. President George W Bush touted free trade as a means of strengthening democracy";
      let sentences = tokenizer.sentences(entry);

      it('should get 1 sentence', function () {
          assert.equal(sentences.length, 1);
      });
  });

  describe('Difficult sentence (F)', function () {
      let entry = "Mike Tyler rides his bike on Del. 1 near Lewes early last month";
      let sentences = tokenizer.sentences(entry);

      it('should get 1 sentence', function () {
          assert.equal(sentences.length, 1);
      });
  });

  // Questionable behavior, but can only be fixed using ML?
  describe('Dot in middle of word is skipped', function () {
      let entry = "Hello.this is my first sentence.";
      let sentences = tokenizer.sentences(entry);

      it("should get 1 sentences", function () {
          assert.equal(sentences.length, 1);
      });
  });

  describe('Punctuation is skipped inside brackets', function () {
      let entry = "Lorem ipsum, dolor sed amat frequentor minimus with a sentence [example?] that should not (Though sometimes...) be two or more (but one!) sentences.";
      let sentences = tokenizer.sentences(entry);

      it("should get 1 sentence", function () {
          assert.equal(sentences.length, 1);
      });
  });
});