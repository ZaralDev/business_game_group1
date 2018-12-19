const VIEW_PATH = require('../config.js').VIEW_PATH;
const API_URL = require('../config.js').API_URL;
var express = require('express');
var router = express.Router();
const axios = require('axios');
/* GET home pages. */
router.get('/', function (req, res, next) {
  getClientSecret().then(function(data) {
    console.log(data.data);
    res.render('paiement', { client_secret: data.data });

  }).catch(function(err) {
    console.log("err");
    console.log(err);
    res.render('paiement', { client_secret: -1 });

  });
});

function getClientSecret() {
  return new Promise(function (resolve, reject) {
    axios.request({
      url: "http://localhost:3333/payment",
      method: "POST",
      data: {
        amount: 1000
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (error) {
      reject(error.response);
    })
  });
}


module.exports = router;
