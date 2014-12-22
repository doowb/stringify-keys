'use strict';

var should = require('should');
var stringify = require('./');

describe('stringify-keys', function () {
  it('should return an array for a simple object', function () {
    var obj = {
      a: 'A',
      b: 'B',
      c: 'C'
    };
    stringify(obj).should.eql([ 'a', 'b', 'c' ]);
  });

  it('should return an array for a single level object', function () {
    var obj = {
      a: 'A',
      b: {
        c: 'C'
      }
    };
    stringify(obj).should.eql([ 'a', 'b', 'b.c' ]);
  });

  it('should return an array for a multi level object', function () {
    var obj = {
      a: 'A',
      b: {
        c: 'C'
      },
      d: {
        e: {
          f: {
            g: 'G',
            h: 'H'
          }
        }
      }
    };
    stringify(obj).should.eql([ 'a', 'b', 'b.c', 'd', 'd.e', 'd.e.f', 'd.e.f.g', 'd.e.f.h' ]);
  });

  it('should return an array for a multi level, multi key object', function () {
    var obj = {
      a: 'A',
      b: {
        c: 'C',
        c2: {
          d: 'D'
        },
        c3: {
          d: 'D'
        }
      },
      d: {
        e: {
          f: {
            g: 'G',
            h: 'H'
          }
        }
      }
    };
    stringify(obj).should.eql([ 'a', 'b', 'b.c', 'b.c2', 'b.c2.d', 'b.c3', 'b.c3.d', 'd', 'd.e', 'd.e.f', 'd.e.f.g', 'd.e.f.h' ]);
  });

  it('should return an array for a multi level, multi key object with a custom seperator', function () {
    var obj = {
      a: 'A',
      b: {
        c: 'C',
        c2: {
          d: 'D'
        },
        c3: {
          d: 'D'
        }
      },
      d: {
        e: {
          f: {
            g: 'G',
            h: 'H'
          }
        }
      }
    };
    stringify(obj, '-').should.eql([ 'a', 'b', 'b-c', 'b-c2', 'b-c2-d', 'b-c3', 'b-c3-d', 'd', 'd-e', 'd-e-f', 'd-e-f-g', 'd-e-f-h' ]);
  });

});
