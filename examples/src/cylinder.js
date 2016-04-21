var gp = require('../../../noce/lib/gp.js');
var Geom = require('../../../noce/lib/Geom.js');
var brep = require('../../../noce/lib/brep.js');
var math = require('mathjs');
module.exports = function() {
  var axis = new gp.Ax3(new gp.Pnt(0, 0, 0), new gp.Dir(0,1, 0), new gp.Dir(0, 0, 1));
  var sphereSurface = new Geom.CylindricalSurface(axis, 40);
  var sphere = brep.makeFace(sphereSurface, 0, math.pi*2, 0, math.pi*2, 0.01);
  return sphere;
}
