var path = require('path');
var fs = require('fs');
var glob = require('glob');
var arrify = require('arrify');
var mesh = require('../noce/lib/mesh.js');

function replacer(key, value) {
  if (value.constructor.name === 'Float32Array' || value.constructor.name === 'Int32Array')
    return Array.prototype.slice.call(value);
  if (typeof value === "number") {
    return Number((Math.round(value * 10000) / 10000).toPrecision(4))
  }
  return value;
}

function runExampleFile(file) {
  var relPath = path.relative(__dirname, file);
  if(!relPath.startsWith('.'))
    relPath = './' + relPath;
  var example = require(relPath);
  var shapes = arrify(example());
  var meshes = shapes.map(shape => mesh(shape, 0.01, 20, true));

  return JSON.stringify(meshes, replacer);
}
//module.exports = renderThreeJSExample
function runExample(options){
  options = options || {};
  var keys = options.keys || [];

  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(file => {
      var data = files[file];
      console.log(data);
      console.log(metalsmith)
      var mesh = runExampleFile(path.join(metalsmith._directory, 'src', file));

      console.log(mesh)
    });
  };
}
function renderExample(file){
  var basename = path.basename(file).replace('.js', '');
  var template = String(fs.readFileSync('src/shapeTemplate.html'));
  var mesh = runExampleFile(file);
  template = template.replace('${meshData}', mesh);
  fs.writeFileSync('./examples/build/'+basename+'.html', template);

}

glob.sync('examples/src/*.js').forEach(renderExample);

// var Metalsmith = require('metalsmith');
// Metalsmith('./examples')
//   .use(runExample())
//   .build(function(err) {
//     if (err) throw err;
//   });
// Metalsmith(__dirname)
//   .use(markdown())
//   .use(layouts('handlebars'))
//   .build(function(err) {
//     if (err) throw err;
//   });
