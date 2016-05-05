var gp = require('../../noce/lib/gp.js');
var geom = require('../../noce/lib/geom.js');
var topo = require('../../noce/lib/topo.js');
var math = require('mathjs');
module.exports = function() {
  var axis = new gp.Ax3(new gp.Pnt(0, 0, 0), new gp.Dir(0.5, 1, 0), new gp.Dir(0, 0, 1));
  var sphereSurface = new geom.SphericalSurface(axis, 3);
  var bounds = sphereSurface.bounds();
  console.log(sphereSurface.bounds())
  var sphere = topo.makeFace(sphereSurface,
    bounds.u1, bounds.u2 * 2.0 / 4.0,
    bounds.v1, bounds.v2, 0.01);

  return sphere;
}
