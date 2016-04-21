var gp = require('../../noce/lib/gp.js');
var Geom = require('../../noce/lib/Geom.js');
var brep = require('../../noce/lib/brep.js');
var math = require('mathjs');
module.exports = function() {
  var axis = new gp.Ax3(new gp.Pnt(0, 0, 0), new gp.Dir(1, 0, 0), new gp.Dir(0, 1, 0));
  var sphereSurface = new Geom.Plane(axis);
  var sphere = brep.makeFace(sphereSurface, 0, 10, 0, 10, 0.01);
  return sphere;
}
