
// console.log(process.env)
console.log(process.argv)



const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

// function readFile(srcPath) {
//   return new Promise(function (resolve, reject) {
//       fs.readFile(srcPath, 'utf8', function (err, data) {
//           if (err) {
//               reject(err)
//           } else {
//               resolve(data);
//           }
//       });
//   })
// }

// function writeFile(savPath, data) {
//   return new Promise(function (resolve, reject) {
//       fs.writeFile(savPath, data, function (err) {
//           if (err) {
//               reject(err)
//           } else {
//               resolve();
//           }
//       });
//   })
// }

// const wsDir =  process.env.BUILD_WORKSPACE_DIRECTORY;



// const in_file = process.argv[2]
// const out_file = process.argv[3]
const dest = process.argv[process.argv.length-1]

// console.log('Read ', in_file)
console.log('pwd:', process.cwd())
console.log(shell.ls(process.cwd()))

console.log('Write ', dest)

shell.mkdir('-p', path.join(dest, 'frontend'))
shell.cp(process.argv[2], dest)
console.log('front path', path.dirname(process.argv[3]))
console.log(shell.ls('-R', path.resolve(path.dirname(process.argv[3]), '../' )))
shell.cp(path.dirname(process.argv[3]), path.join(dest, 'frontend'))
// shell.cp(process.argv[3], path.join(dest, 'frontend'))



// readFile(in_file)
//   .then(function(results){
//     results+=" test manipulation";
//     return writeFile(path.join(out_file, 'qwe.txt'), results);
//   }).then(function(){
//   //done writing file, can do other things
//   })
