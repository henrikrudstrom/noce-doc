var gp = require('../../noce/lib/gp.js');
var geom = require('../../noce/lib/geom.js');
var topo = require('../../noce/lib/topo.js');
var primitives = require('../../noce/lib/primitives.js');
var math = require('mathjs');

module.exports = function() {
  var woodW = 25;
  var woodH = 60;
  var spacing = 15;

  var planterLength = 1200;
  var planterWidth = 800;

  var sides = []

  function layer(n, trsf, length) {
    var height = n * (woodH + spacing)
    var xOffset = (n % 2) * woodW;
    var solid = primitives.makeBox(
      new gp.Pnt(xOffset, height, 0),
      new gp.Pnt(xOffset + length - woodW, height + woodH, woodW)
    );
    //return solid;
    return topo.transform(solid, trsf, false);
  }

  function side(pos, vec, even) {
    var trsf = new gp.Trsf();
    var dir = new gp.Dir(vec);
    trsf.setTransformation(new gp.Ax3(pos, dir.cross(new gp.Dir(0,1,0))));
    return [1, 2, 3].map(n => layer(n, trsf, vec.magnitude()));
  }
  return [
    side(new gp.Pnt(0, 0, 0), new gp.Vec(planterLength, 0, 0)),
    side(new gp.Pnt(0, 0, -planterLength), new gp.Vec(0, 0, planterWidth)),
    side(new gp.Pnt(planterLength, 0, planterWidth), new gp.Vec(-planterLength, 0, 0)),
    //side(new gp.Pnt(0, 0, planterWidth), new gp.Vec(0, 0, -planterWidth))
  ].reduce((a, b) => a.concat(b));
}
