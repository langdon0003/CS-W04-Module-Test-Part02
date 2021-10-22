const express = require('express');
const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const companyApi = require("./company.api")

router.use("/companies", companyApi)

module.exports = router;
