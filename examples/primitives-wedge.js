var gp = require('../../noce/lib/gp.js');
var geom = require('../../noce/lib/geom.js');
var topo = require('../../noce/lib/topo.js');
var primitives = require('../../noce/lib/primitives.js');
var math = require('mathjs');
module.exports = function() {
  var wedge = new primitives.makeWedge(10,5,6,3);

  return wedge;
}
