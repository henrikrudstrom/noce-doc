var path = require('path')
var arrify = require('arrify')
var fs = require('fs');
var glob = require('glob');

var mesh = require('../noce/lib/mesh.js');
var gp = require('../noce/lib/gp.js');
var geom = require('../noce/lib/geom.js');
var topo = require('../noce/lib/topo.js');
var primitives = require('../noce/lib/primitives.js');
//var math = require('mathjs');






function runExampleFile(file) {
  var relPath = path.relative(__dirname, file);

  if (!relPath.startsWith('.'))
    relPath = './' + relPath;

  var example = require(relPath);
  console.log("GO!");
  var shapes = example();
  console.log("SHAPES", shapes);
//  var faces = shapes.faces();
  var faces = shapes.map(shape => shape.faces ? shape.faces() : [shape])
    .reduce((a, b) => a.concat(b));
  console.log("faces", faces);
  var meshes = faces.map(face => mesh(face, 0.02, 20, true));
  console.log("done");

  return JSON.stringify(meshes, replacer);
}

var res = runExampleFile('./examples/planter.js');
//var res = require('./examples/bottle.js');
//res()
