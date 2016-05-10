var gp = require('../../noce/lib/gp.js');
var geom = require('../../noce/lib/geom.js');
var topo = require('../../noce/lib/topo.js');
var primitives = require('../../noce/lib/primitives.js');
var fillet = require('../../noce/lib/fillet.js');
var boolean = require('../../noce/lib/boolean.js');
var math = require('mathjs');

module.exports = function() {
  var height = 70;
  var width = 50;
  var thickness = 30;
  var pt1 = new gp.Pnt(-width / 2.0, 0, 0);
  var pt2 = new gp.Pnt(-width / 2.0, -thickness / 4.0, 0);
  var pt3 = new gp.Pnt(0, -thickness / 2.0, 0);
  var pt4 = new gp.Pnt(width / 2.0, -thickness / 4.0, 0);
  var pt5 = new gp.Pnt(width / 2.0, 0, 0);

  var arc = geom.TrimmedCurve.makeArcOfCircle(pt2, pt3, pt4);
  var segment1 = geom.TrimmedCurve.makeSegment(pt1, pt2);
  var segment2 = geom.TrimmedCurve.makeSegment(pt4, pt5);

  var trsf = new gp.Trsf();
  trsf.setMirror(new gp.Ax1(new gp.Pnt(0, 0, 0), new gp.Dir(1, 0, 0)));

  var edge1 = topo.makeEdge(segment1);
  var edge2 = topo.makeEdge(arc);
  var edge3 = topo.makeEdge(segment2);
  var edge4 = topo.transform(edge3, trsf, true);
  var edge5 = topo.transform(edge2, trsf, true);
  var edge6 = topo.transform(edge1, trsf, true);

  var wire = topo.makeWire([edge1, edge2, edge3, edge4, edge5, edge6]);
  var face = topo.makeFace(wire, true);

  var body = primitives.makePrism(face, new gp.Vec(0, 0, height), false, true);

  var makeFillet = new fillet.MakeFillet(body, 0);
  var edges = body.edges();
  body.edges().forEach(edge => makeFillet.add(thickness / 12, edge));
  console.log(makeFillet.nbContours());
  makeFillet.build();
  console.log("isdone", makeFillet.isDone())
  var body = makeFillet.shape();


  // Create the neck of the bottle
  neckLocation = new gp.Pnt(0, 0, height);
  neckAx2 = new gp.Ax2(neckLocation, new gp.Dir(0, 0, 1));

  myNeckRadius = thickness / 4.0
  myNeckHeight = height / 10.0

  cylinder = primitives.makeCylinder(neckAx2, myNeckRadius, myNeckHeight)

  body = new boolean.fuse(body, cylinder);


  return body.solids().concat([cylinder]);
}

//module.exports();
