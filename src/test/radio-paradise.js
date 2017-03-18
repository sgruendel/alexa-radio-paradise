'use strict';

var expect = require('chai').expect;
var radioParadise = require('../radio-paradise');

describe('Radio Paradise helpers', function() {
    describe('#getPlaylist()', function() {
        it('should give songs playing', function(done) {
            radioParadise.getPlaylist(function(err, result) {
                expect(err).to.be.null;
                expect(result).to.have.length.above(3);
                expect(result[0].artist).to.be.a('string');
                done();
            });
        });
    });
});
