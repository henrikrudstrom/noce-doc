var path = require('path');
var fs = require('fs');
var glob = require('glob');
var arrify = require('arrify');
var mesh = require('../noce/lib/mesh.js');
var es = require('event-stream');
var gutil = require('gulp-util');
var reload = require('require-reload')(require);

// filter json numbers
function replacer(key, value) {
  if (value.constructor.name === 'Float32Array' || value.constructor.name === 'Int32Array')
    return Array.prototype.slice.call(value);

  if (typeof value === "number")
    return Number((Math.round(value * 10000) / 10000).toPrecision(4))

  return value;
}

function runExampleFile(file) {
  var relPath = path.relative(__dirname, file);

  if (!relPath.startsWith('.'))
    relPath = './' + relPath;

  var example = reload(relPath);
  var shapes = arrify(example());
  var meshes = shapes.map(shape => mesh(shape, 0.01, 20, true));

  return JSON.stringify(meshes, replacer);
}

function renderExample(file) {
  var basename = path.basename(file).replace('.js', '');
  var mesh;

  try {
    mesh = runExampleFile(file);
  } catch (error) {
    var template = String(fs.readFileSync('src/errorTemplate.html'));
    var msg = error.stack.split('\n').map(line => '<div>'+line+'</div>').join('\n');
    return template.replace('${errorMessage}', error.toString() + msg);
  }

  var template = String(fs.readFileSync('src/shapeTemplate.html'));
  return template.replace('${meshData}', mesh);
}

module.exports = function(opt) {
  function modifyFile(file) {
    if (file.isNull()) return this.emit('data', file);
    if (file.isStream()) return this.emit('error', new Error("noce-doc: Streaming not supported"));

    var dest = gutil.replaceExtension(file.path, ".html");
    var src = renderExample(file.path);

    file.contents = new Buffer(src);
    file.path = dest;
    this.emit('data', file);
  }

  return es.through(modifyFile);
};
