var hmc5883l = require('./hmc2.js');
var math = require('mathjs');

var xval = -1;
var yval = -1;
var zval = -1;

var bearing = -1;

hmc5883l.Initialize(function(err, data)
{

  hmc5883l.SetUp(function(err)
  {
    //console.log("Commencing")
  });
  for(var i = 1; i <= 6; i++)
  {
    hmc5883l.readX(function(err, data){
      console.log("X value =", data);
      xval = data;
    });
    hmc5883l.readY(function(err, data){
      console.log("Y value =", data);
      yval = data;
    });
    bearing = math.atan2(yval, xval) + .48;
    if(bearing < 0)
    {
      bearing += 2 * math.pi;
    }
    bearing = bearing * (180 / math.pi);
    console.log("Bearing =", bearing);
  }

});
