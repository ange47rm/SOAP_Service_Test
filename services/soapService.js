const soap = require('soap');
const soapRepository = require('../repositories/soapRepository');

const soapService = {
  processRequest: async (xml) => {
    const parsedData = await soap.parseStringPromise(xml);
    const email = parsedData['soap:Envelope']['soap:Body'][0]['YesNoRequest'][0]['email'][0];
    const yesOrNo = parsedData['soap:Envelope']['soap:Body'][0]['YesNoRequest'][0]['yesOrNo'][0];

    // Implement your logic here to store the data

    // Prepare and return the SOAP response
    const response = `
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://localhost:3001/store-survey-information">
        <soap:Body>
          <result>Stored successfully</result>
        </soap:Body>
      </soap:Envelope>
    `;

    return response;
  },
};

module.exports = soapService;
