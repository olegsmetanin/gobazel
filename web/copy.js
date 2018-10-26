
// console.log(process.env)
// console.log(process.argv)

const path = require('path');
const fs = require('fs');

function readFile(srcPath) {
  return new Promise(function (resolve, reject) {
      fs.readFile(srcPath, 'utf8', function (err, data) {
          if (err) {
              reject(err)
          } else {
              resolve(data);
          }
      });
  })
}

function writeFile(savPath, data) {
  return new Promise(function (resolve, reject) {
      fs.writeFile(savPath, data, function (err) {
          if (err) {
              reject(err)
          } else {
              resolve();
          }
      });
  })
}

// const wsDir =  process.env.BUILD_WORKSPACE_DIRECTORY;

console.log('Copy ', path.join(__dirname, 'index.html'))

readFile(path.join(__dirname, 'index.html'))
  .then(function(results){
    results+=" test manipulation";
    return writeFile(path.join(__dirname, 'index1.html'),results);
  }).then(function(){
  //done writing file, can do other things
  })
