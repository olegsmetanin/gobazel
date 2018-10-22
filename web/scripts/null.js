const { exec } = require('child_process');

console.log('process.cwd()', process.cwd())
// new Promise(res => {
  exec('ls web/node_modules', (err, stdout, stderr) => {

// exec('node -e "console.log(module.paths)"', (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      console.log(`${stdout}`);
      console.log(`${stderr}`);

      // res()
    });

  // })
