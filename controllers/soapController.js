const express = require('express');
const soap = require('soap');
const soapService = require('../services/soapService');

const router = express.Router();

router.post('/store-survey-information', async (req, res) => {
  console.log("asd")
  const xml = req.body.toString('utf8');
  const response = await soapService.processRequest(xml);
  res.status(200).send(response);
});

module.exports = router;