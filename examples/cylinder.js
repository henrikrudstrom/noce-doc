var gp = require('../../noce/lib/gp.js');
var geom = require('../../noce/lib/geom.js');
var topo = require('../../noce/lib/topo.js');
var math = require('mathjs');
module.exports = function() {
  var axis = new gp.Ax3(new gp.Pnt(0, 0, 0), new gp.Dir(0,1, 1), new gp.Dir(0, 0, 1));
  var sphereSurface = new geom.CylindricalSurface(axis, 40);
  var sphere = topo.makeFace(sphereSurface, 0, math.pi*2, 0, 25, 0.01);
  return sphere;
}
