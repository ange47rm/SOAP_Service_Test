const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');

const app = express();

app.use(bodyParser.text({ type: 'text/xml' }));

// Define your SOAP service endpoint
const service = {
  SurveyService: {
    SurveyPort: {
      storeYesOrNo: async function (args) {
        const { email, yesOrNo } = args;

        // Return the SOAP response
        return {
          result: `Result ${email} + ${yesOrNo}`,
        };
      },
    },
  },
};

// Create the SOAP server
const xml = require('fs').readFileSync('your-service.wsdl', 'utf8');
const server = soap.listen(app, '/store-survey-information', service, xml);

const port = 3001;
app.listen(port, () => {
  console.log(`SOAP server listening on port ${port}`);
});
