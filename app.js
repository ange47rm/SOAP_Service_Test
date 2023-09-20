const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');

const app = express();

app.use(bodyParser.text({ type: 'text/xml' }));

// Define your SOAP service endpoint
const service = {
  SurveyService: {
    port: {
      storeYesOrNo: async function (args) {
        const xml = args._xml; // Access the raw XML request
        const parsedData = await soap.parseStringPromise(xml);
        const email = parsedData['soap:Envelope']['soap:Body'][0]['YesNoRequest'][0]['email'][0];
        const yesOrNo = parsedData['soap:Envelope']['soap:Body'][0]['YesNoRequest'][0]['yesOrNo'][0];

        if (!email || typeof yesOrNo === 'undefined') {
          // Handle invalid input and return a SOAP fault response if necessary
          throw new Error('Invalid input');
        }

        // Implement your logic here

        // Return the SOAP response
        return {
          result: 'Stored successfully',
        };
      },
    },
  },
};

// Create the SOAP server
const xml = require('fs').readFileSync('your-service.wsdl', 'utf8');
const server = soap.listen(app, '/store-survey-information', service, xml);

const port = 3000;
app.listen(port, () => {
  console.log(`SOAP server listening on port ${port}`);
});
