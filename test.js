// var path = require('path')
// var arrify = require('arrify')
// var fs = require('fs');
// var glob = require('glob');

var mesh = require('../noce/lib/mesh.js');
var gp = require('../noce/lib/gp.js');
var geom = require('../noce/lib/geom.js');
var topo = require('../noce/lib/topo.js');
var primitives = require('../noce/lib/primitives.js');
//var math = require('mathjs');

function bottle() {
  var height = 70
  var width = 50
  var thickness = 30
  console.log('!!')
  var pt1 = new gp.Pnt(-width / 2.0, 0, 0)
  var pt2 = new gp.Pnt(-width / 2.0, -thickness / 4.0, 0)
  var pt3 = new gp.Pnt(0, -thickness / 2.0, 0)
  var pt4 = new gp.Pnt(width / 2.0, -thickness / 4.0, 0)
  var pt5 = new gp.Pnt(width / 2.0, 0, 0)
  console.log('!!')

  var arc = geom.TrimmedCurve.makeArcOfCircle(pt2, pt3, pt4)
  var segment1 = geom.TrimmedCurve.makeSegment(pt1, pt2)
  var segment2 = geom.TrimmedCurve.makeSegment(pt4, pt5)
  console.log('!!')

  var trsf = new gp.Trsf();
  trsf.setMirror(new gp.Ax1(new gp.Pnt(0,0,0), new gp.Dir(1, 0, 0)));
  console.log('!!', segment1)

  var edge1 = topo.makeEdge(segment1);
  console.log('!!')
  var edge2 = topo.makeEdge(arc);
  console.log('!!')
  var edge3 = topo.makeEdge(segment2);
  console.log('!!')
  var edge4 = topo.transform(edge3, trsf, true);
  var edge5 = topo.transform(edge2, trsf, true);
  var edge6 = topo.transform(edge1, trsf, true);
  console.log('!!')

  var wire = topo.makeWire([edge1, edge2, edge3, edge4, edge5, edge6]);
  console.log('!!')
  var face = topo.makeFace(wire, true);
  console.log('!!')

  var body = primitives.makePrism(face, new gp.Vec(0,0,height), false, true);
  console.log('!!')
  return body;
}







function runExampleFile(file) {
  // var relPath = path.relative(__dirname, file);
  //
  // if (!relPath.startsWith('.'))
  //   relPath = './' + relPath;

  //var example = require(relPath);
  console.log("GO!");
  var shapes = bottle();
  console.log("SHAPES", shapes);
  var faces = shapes.faces();
  // var faces = shapes.map(shape => shape.faces ? shape.faces() : [shape])
  //   .reduce((a, b) => a.concat(b));
  // console.log("faces", faces);
  // var meshes = faces.map(face => mesh(face, 0.02, 20, true));
  // console.log("done");

  return JSON.stringify(meshes, replacer);
}

var res = runExampleFile('./examples/bottle.js');
//var res = require('./examples/bottle.js');
//res()
