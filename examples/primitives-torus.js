var gp = require('../../noce/lib/gp.js');
var geom = require('../../noce/lib/geom.js');
var topo = require('../../noce/lib/topo.js');
var primitives = require('../../noce/lib/primitives.js');
var math = require('mathjs');
module.exports = function() {
  var axis = new gp.Ax2(new gp.Pnt(0, 0, 0), new gp.Dir(1, 1, 0), new gp.Dir(0, 0, 1))
  var torus = new primitives.makeTorus(axis, 10, 3, 3 * Math.PI / 2);

  return torus;
}
