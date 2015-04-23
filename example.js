console.log("Start");
var hmc5883l = require('hmc5883l');
var compass = new hmc5883l({device: '/dev/i2c-1'});
outCompass();
function outCompass(){
  compass.readXYZ(function(err, data) {
      if (err) {
          console.log(err);
      }
      else {
          console.log(data);
      }
  });
  setTimeout(outCompass, 1000);
}
