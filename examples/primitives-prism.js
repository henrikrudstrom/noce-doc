var gp = require('../../noce/lib/gp.js');
var geom = require('../../noce/lib/geom.js');
var topo = require('../../noce/lib/topo.js');
var primitives = require('../../noce/lib/primitives.js');
var math = require('mathjs');

module.exports = function() {
  var plane = new geom.Plane(new gp.Ax3(
    new gp.Pnt(0, 0, 0), new gp.Dir(1, 0, 0), new gp.Dir(0, -1, 0)
  ));
  var face = topo.makeFace(plane, 3, 4, 0, 2, 0.01);
  var prism = primitives.makePrism(face, new gp.Vec(0.5, 1.5, 0), false, false);

  return prism;
}
