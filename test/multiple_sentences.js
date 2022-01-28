/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

let assert = require('assert');
let tokenizer = require('../lib/tokenizer');

describe('Multiple sentences', function () {
    describe('Include ellipsis as ending if starts with capital', function () {
        let entry = "First sentence... Another sentence";
        let sentences = tokenizer.sentences(entry);

        it('should get two sentences', function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Two sentences', function () {
        let entry = "Lorem ipsum, dolor sed amat frequentor minimus. Second sentence.";
        let sentences = tokenizer.sentences(entry);

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Difficult two sentences (A)', function () {
        let entry = "On Jan. 20, former Sen. Barack Obama became the 44th President of the U.S. Millions attended the Inauguration.";
        let sentences = tokenizer.sentences(entry);

        it('should get two sentences', function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Difficult two sentences (B)', function () {
        let entry = "Sen. Barack Obama became the 44th President of the US. Millions attended.";
        let sentences = tokenizer.sentences(entry);

        it('should get two sentence', function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Difficult two sentences (C)', function () {
        let entry = "Barack Obama, previously Sen. of lorem ipsum, became the 44th President of the U.S. Millions attended.";
        let sentences = tokenizer.sentences(entry);

        it('should get two sentence', function () {
            assert.equal(sentences.length, 2);
        });
    });


    describe('Difficult two sentences (D)', function () {
        let entry = "Baril, a Richmond lawyer once nominated for a federal prosecutors job, endorsed a faith-based drug initiative in local jails patterned after the Henrico County jails therapeutic program called Project R.I.S.E. Just as important, he had a great foil across the net.";
        let sentences = tokenizer.sentences(entry);

        it('should get two sentence', function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Difficult two sentences (E)', function () {
        let entry = "Newsletter AIDs CARE, EDUCATION AND TRAINING Issue No. 7. Acet Home Care, which moves into the building in July, will share the offices with two other AIDS charities, P.A.L.S. (Portsmouth AIDS Link Support) and the Link Project.";
        let sentences = tokenizer.sentences(entry);

        it('should get two sentence', function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Difficult two sentences (F)', function () {
        let entry = "Another is expanded hours of operation -- from fewer than five hours a day to 9:30 a.m. to 4 p.m. Monday through Saturday. Sunday remains closed.";
        let sentences = tokenizer.sentences(entry);

        it('should get two sentence', function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Difficult two sentences (G)', function () {
        let entry = "Gold Wing Road Rider's Association - Coffee break, Guzzardo's Italian Villa, eat, 6 p.m.; ride, 7 p.m. Then at 9 p.m. go home.";
        let sentences = tokenizer.sentences(entry);

        it('should get two sentence', function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Dot in middle of word is not skipped if followed by capital letter', function () {
        let entry = "Hello Barney.The bird in the word.";
        let sentences = tokenizer.sentences(entry);

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Question- and exlamation mark', function () {
        let entry = "Hello this is my first sentence? There is also a second! A third";
        let sentences = tokenizer.sentences(entry);

        it("should get 3 sentences", function () {
            assert.equal(sentences.length, 3);
        });
    });

    describe('It should skip keywords/code with a dot in it', function () {
        let entry = "HELLO A.TOP IS NICE";
        let sentences = tokenizer.sentences(entry);

       it("should get 2 sentences", function () {
            assert.equal(sentences.length, 1);
        });
    });

    describe('If newlines are boundaries', function () {
        let entry = "Search on http://google.com\n\nThen send me an email: gg@gggg.kk";
        let sentences = tokenizer.sentences(entry, { "newline_boundaries": true });

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
    });


    describe('Sentences with quotations', function () {
        let entry = "“If there’s no balance and your boss doesn’t provide support and work that’s meaningful, your chances of burning out are great.” What bothers most people in situations like these is “the lack of boundaries,” says Nancy Rothbard, the David Pottruck Professor of Management at the University of Pennsylvania’s Wharton School.";
        let sentences = tokenizer.sentences(entry, { "newline_boundaries": true });

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Sentences with quotations', function () {
        let entry = "“If there’s no balance! And your boss doesn’t provide support and work that’s meaningful, your chances of burning out are great.” What bothers most people in situations like these is “the lack of boundaries,” says Nancy Rothbard, the David Pottruck Professor of Management at the University of Pennsylvania’s Wharton School.";
        let sentences = tokenizer.sentences(entry, { "newline_boundaries": true });

        it("should get 3 sentences", function () {
            assert.equal(sentences.length, 3);
        });
    });


    describe('Sentences with a name ending a sentence', function () {
        let entry = `If your boss assumes he can interrupt you any time and it’s "impacting the way you do your job," you should communicate that "you feel stretched," says Hill. A growing body of research shows that being “always on” hurts results.`
        let sentences = tokenizer.sentences(entry, { "newline_boundaries": true });

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
    });


    describe('If newlines are boundaries (B)', function () {
        let entry = "FAMILIY HISTORY   ========================================== Nothing interesting";
        let sentences = tokenizer.sentences(entry, { "newline_boundaries": true });

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
    });
});