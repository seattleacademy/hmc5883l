var i2c = require('i2c');

//the address of the wire
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

var x_offset = -10;
var y_offset = 10;
var scale = 0.92;

var x_out = -1;
var y_out = -1;
var z_out = -1;

var exports = module.exports = {};
var i2cdevice;

exports.Initialize = function(Callback)
{
    //sets up the device
    i2cdevice = new i2c(HMC5883l_ADDR, {device: '/dev/i2c-1'});

    Callback();
}

function ReadData(Register, Bytes, Callback)
{
    i2cdevice.readBytes(Register, Bytes, function(err, data)
    {
        var ParsedData;
        if(Bytes == 1)
        {
            ParsedData = data.readUInt8(0);
        }
        else if(Bytes == 2)
        {
            ParsedData = data.readUInt16BE(0);
        }

        Callback(err, ParsedData);
    });
}

//sends the LSB first. The device wants the MSB first.
function WriteData(Register, ByteArray, Callback)
{
    i2cdevice.writeBytes(Register, ByteArray, function(err)
    {
        Callback(err);
    });
}

exports.readX = function(Callback)
{
  ReadData(HMC5883l_DATA_X_MSB, 1, function(err, data)
  {
    x_out = (data - x_offset+2) * scale;

    Callback(err, x_out);
  }

}
