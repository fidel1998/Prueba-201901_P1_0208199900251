var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();


var fileModel = require('./jsonmodel');
var data = null; // temporary store

var empresa = {
  '_id':'',
  'empresa':'',
  'url':'',
  'nombre':'',
  'year':null,
  'rating':null,
  'fecha':null
};

router.get('/', function( req, res, next) {
  if(!data){
    fileModel.read(function(err, filedata){
      if(err){
        console.log(err);
        data = [];
        return res.status(500).json({'error':'Error al Obtener Data'});
      }
      data = JSON.parse(filedata);
      return res.status(200).json(data);
    });
  } else {
    return res.status(200).json(data);
  }
});// get /

router.post('/new', function(req, res, next){
  var _empresaData = Object.assign({} , empresa, req.body);
  var dateT = new Date();
  _empresaData.fcIng = dateT;
  _empresaData._id = uuidv4();
  if(!data){
    data = [];
  }
  data.push(_empresaData);
  fileModel.write(data, function(err){
    if(err){
      console.log(err);
      return res.status(500).json({ 'error': 'Error al Obtener Data' });
    }
    return res.status(200).json(_empresaData);
  });
});

fileModel.read(function(err , filedata){
  if(err){
    console.log(err);
  } else{
    data = JSON.parse(filedata);
  }
});

module.exports = router;