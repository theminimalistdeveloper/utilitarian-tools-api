import AWS from 'aws-sdk';
import * as HttpStatusCodes from 'http-status-codes';

/**
 * Format the content for the suggestion and send via email
 * @param {Object} suggestion
 * @return
 */
function sendEmail(suggestion) {
  const ses = new AWS.SES();
  let bodyData = '';
  Object.entries(suggestion).forEach((item) => {
    bodyData += `${item[0]} = ${item[1]}\n`;
  });

  console.log('Body Data', bodyData);

  const params = {
    Destination: {
      ToAddresses: [
        'theminimalistdeveloper@gmail.com',
      ],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: bodyData,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Suggestion ${suggestion.name}`,
      },
    },
    Source: 'theminimalistdeveloper@gmail.com',
  };

  return ses.sendEmail(params).promise();
}

function getResponse(statusCode) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'POST',
    },
  };
}

export async function handler(event) {
  console.log(event);
  try {
    const body = JSON.parse(event.body);
    await sendEmail(body);
    return getResponse(HttpStatusCodes.OK);
  } catch (e) {
    console.error(e.message, JSON.stringify(e));
    return getResponse(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
}
