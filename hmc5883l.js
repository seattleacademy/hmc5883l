var i2c = require('i2c');

var HMC5883l_ADDR	= 0x1e;

var HMC5883l_CRA = 0x00;
var HMC5883l_CRB = 0x01;
var HMC5883l_MODE = 0x02;
var HMC5883l_DATA_X_MSB = 0x03;
var HMC5883l_DATA_X_LSB = 0x04;
var HMC5883l_DATA_Z_MSB = 0x05;
var HMC5883l_DATA_Z_LSB = 0x06;
var HMC5883l_DATA_Y_MSB = 0x07;
var HMC5883l_DATA_Y_LSB = 0x08;
var HMC5883l_STATUS = 0x09;
var HMC5883l_ID_A = 0x0A;
var HMC5883l_ID_B = 0x0B;
var HMC5883l_ID_C = 0x0C;

var HMC5883l_READ = 0x3D;
var HMC5883l_WRITE = 0x3C;

var hmc58831  = function(options, hmcoptions) {
  "use strict";
  this.i2caddr = HMC883l_ADDR;
  this.i2coptions = options;
  if (hmcoptions === undefined) {
      this.hmcoptions = {};
      this.hmcoptions.AGAIN = 0;
      this.hmcoptions.ATIME = 0;
  }
  else {
      this.hmcoptions = hmcoptions;
  }
  this.i2cdevice = new i2c(this.i2caddr, this.i2coptions);
};
hmc5883l.prototype.init = function(hmcoptions, callback) {
    "use strict";
    var i2cdev = this.i2cdevice;
    var that = this;

    if (hmcoptions === undefined) {
        this.hmcoptions = {};
        this.hmcoptions.AGAIN = 0;
        this.hmcoptions.ATIME = 0;
    }
    else {
        this.hmcoptions = hmcoptions;
    }

};

function myCallback(err, data){
  console.log(data);
};

hmc5883l.prototype.readXYZ = function(callback) {
  "use strict";
  //setup
  this.i2cdevice.writeBytes(HMC5883l_WRITE, [HMC5883l_CRA, 0x71], function(err){}); //CRA
  this.i2cdevice.writeBytes(HMC5883l_WRITE, [HMC5883l_CRB, 0xA0], function(err){}); //CRB
  this.i2cdevice.writeBytes(HMC5883l_WRITE, [HMC5883l_MODE, 0x00], function(err){}); //Set to continuous measurement mode

  this.i2cdevice.writeBytes(HMC5883l_WRITE, [0x3D, 0x06], function(err){
    this.i2cdevice.readBytes(HMC4883l_READ, 6, function(err, data){
      if (err) {
          callback(err, null);
      }
      else {

          callback(null, data);
      }
    })
  }); //



}
