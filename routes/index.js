// framework for web application
const express = require('express'); 

// create middleware for routing
var router = express.Router();

// Require controller modules
var download_data_wrapper = require('../controllers/download_data_wrapper');
var jwt_wrapper = require('../controllers/jwt_wrapper');

// define api version
const version = "/v1";

// use jwt wrapper inside the API
router.use('/', jwt_wrapper.verifyJWT);

// get healthy api
router.get('/', (request, response) => {
    response.json({"healthy": true})
});

// define api for apps identifier
router.get(version+'/geo/data', download_data_wrapper.defineDownloadCall);

// export router
module.exports = router;