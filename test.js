'use strict';

var should = require('should');
var stringify = require('./');

describe('stringify-keys', function () {
  it('should return an array for a simple object', function () {
    var obj = {a: 'A', b: 'B', c: 'C'};
    stringify(obj).should.eql([ 'a', 'b', 'c' ]);
  });

  it('should return an array for a single level object', function () {
    var obj = {a: 'A', b: {c: 'C'}};
    stringify(obj).should.eql([ 'a', 'b.c', 'b' ]);
  });

  it('should return an array for a multi level object', function () {
    var obj = {a: 'A', b: {c: 'C'}, d: {e: {f: {g: 'G', h: 'H'}}}};
    stringify(obj).should.eql([ 'a', 'b.c', 'b', 'd.e.f.g', 'd.e.f.h', 'd.e.f', 'd.e', 'd' ]);
  });

  it('should return an array for a multi level, multi key object', function () {
    var obj = {a: 'A', b: {c: 'C', c2: {d: 'D'}, c3: {d: 'D'} }, d: {e: {f: {g: 'G', h: 'H'}}}};
    stringify(obj).should.eql([ 'a', 'b.c', 'b.c2.d', 'b.c2', 'b.c3.d', 'b.c3', 'b', 'd.e.f.g', 'd.e.f.h', 'd.e.f', 'd.e', 'd' ]);
  });

  it('should return an array for a nested object with custom seperator', function () {
    var obj = {a: 'A', b: {c: 'C', c2: {d: 'D'}, c3: {d: 'D'} }, d: {e: {f: {g: 'G', h: 'H'}}}};
    stringify(obj, '-').should.eql([ 'a', 'b-c', 'b-c2-d', 'b-c2', 'b-c3-d', 'b-c3', 'b', 'd-e-f-g', 'd-e-f-h', 'd-e-f', 'd-e', 'd' ]);
  });

  describe('escaped results', function () {
    it('should return an array for a simple object with keys containing the seperator', function () {
      var obj = {'A.a':  'A', 'B.b': 'B', 'C.c': 'c'};
      stringify(obj).should.eql(['A\\.a', 'B\\.b', 'C\\.c']);
    });

    it('should return an array for a single level object with keys containing the seperator', function () {
      var obj = {'A.a': 'A', 'B.b': {'C.c': 'C'}};
      stringify(obj).should.eql([ 'A\\.a', 'B\\.b.C\\.c', 'B\\.b' ]);
    });

    it('should return an array for a multi level object with keys containing the seperator', function () {
      var obj = {'A.a': 'A', 'B.b': {'C.c': 'C'}, 'D.d': {'E.e': {'F.f': {'G.g': 'G', 'H.h': 'H'}}}};
      stringify(obj).should.eql([ 'A\\.a', 'B\\.b.C\\.c', 'B\\.b', 'D\\.d.E\\.e.F\\.f.G\\.g', 'D\\.d.E\\.e.F\\.f.H\\.h', 'D\\.d.E\\.e.F\\.f', 'D\\.d.E\\.e', 'D\\.d' ]);
    });

    it('should return an array for a multi level, multi key object with keys containing the seperator', function () {
      var obj = {'A.a': 'A', 'B.b': {'C.c': 'C', 'C2.c2': {'D.d': 'D'}, 'C3.c3': {'D.d': 'D'} }, 'D.d': {'E.e': {'F.f': {'G.g': 'G', 'H.h': 'H'}}}};
      stringify(obj).should.eql([ 'A\\.a', 'B\\.b.C\\.c', 'B\\.b.C2\\.c2.D\\.d', 'B\\.b.C2\\.c2', 'B\\.b.C3\\.c3.D\\.d', 'B\\.b.C3\\.c3', 'B\\.b', 'D\\.d.E\\.e.F\\.f.G\\.g', 'D\\.d.E\\.e.F\\.f.H\\.h', 'D\\.d.E\\.e.F\\.f', 'D\\.d.E\\.e', 'D\\.d' ]);
    });

    it('should return an array for a nested object with custom seperator with keys containing the seperator', function () {
      var obj = {'A-a': 'A', 'B-b': {'C-c': 'C', 'C2-c2': {'D-d': 'D'}, 'C3-c3': {'D-d': 'D'} }, 'D-d': {'E-e': {'F-f': {'G-g': 'G', 'H-h': 'H'}}}};
      stringify(obj, '-').should.eql([ 'A\\-a', 'B\\-b-C\\-c', 'B\\-b-C2\\-c2-D\\-d', 'B\\-b-C2\\-c2', 'B\\-b-C3\\-c3-D\\-d', 'B\\-b-C3\\-c3', 'B\\-b', 'D\\-d-E\\-e-F\\-f-G\\-g', 'D\\-d-E\\-e-F\\-f-H\\-h', 'D\\-d-E\\-e-F\\-f', 'D\\-d-E\\-e', 'D\\-d' ]);
    });
  });
});
