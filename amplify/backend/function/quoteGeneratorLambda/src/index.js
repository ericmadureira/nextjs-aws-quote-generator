/* Amplify Params - DO NOT EDIT
	API_QUOTEGENERATOR_GRAPHQLAPIIDOUTPUT
	API_QUOTEGENERATOR_QUOTEAPPDATATABLE_ARN
	API_QUOTEGENERATOR_QUOTEAPPDATATABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// AWS packages
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

// Image generation packages
const sharp = require('sharp');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs'
);

// Function: update DynamoDB table
async function updateQuoteTable(tableName, item) {
    const quoteTableName = process.env.API_QUOTEGENERATOR_QUOTEAPPDATATABLE_NAME;
    const quoteObjectID = "11122-444333-444111555-666222555";

    try {
        var quoteParams = {
            TableName: quoteTableName,
            Key: { "id": quoteObjectID },
            UpdateExpression: "SET #quotesGenerated = #quotesGenerated + :inc",
            ExpressionAttributeValues: {
                ":inc": 1
            },
            ExpressionAttributeNames: {
                "#quotesGenerated": "quotesGenerated"
            },
            ReturnValues: "UPDATED_NEW"
        };

        const updateQuoteObject = await docClient.update(quoteParams).promise();
        return updateQuoteObject;
    } catch (error) {
        console.log("Error updating Quote table in DynamoDB:", error)
    }
}

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const API_URL = "https://zenquotes.io/api/random";

    // Function: generate quote image
    async function getRandomQuote(url = API_URL) {
        let quoteText;
        let quoteAuthor;

        // Validate response
        const response = await fetch(url);
        const quoteData = await response.json();

        // Quote elements
        quoteText = quoteData[0].q;
        quoteAuthor = quoteData[0].a;

        // Image parameters
        const width = 750;
        const height = 483;
        const chunkSize = 4;
        const words = quoteText.split(" ");

        // Format text to fit image
        let formattedQuote = "";
        let line = "";
        for (let i = 0; i < words.length; i += chunkSize) {
          line = words.slice(i, i + chunkSize).join(" ");
          formattedQuote += `<tspan x="${width / 2}" dy="1.2em">${line}</tspan>`;
        }

        // Construct the SVG
        const svgImage = `
          <svg width="${width}" height="${height}">
              <style>
                  .title {
                      fill: #fff;
                      font-size: 20px;
                      font-weight: bold;
                  }
                  .quoteAuthorStyles {
                      font-size: 35px;
                      font-weight: bold;
                      padding: 50px;
                  }
                  .footerStyles {
                      font-size: 20px;
                      font-weight: bold;
                      fill: black;
                      text-anchor: middle;
                      font-family: Verdana;
                  }
              </style>

              <circle cx="382" cy="76" r="44" fill="rgba(255, 255, 255, 0.155)" />
              <text x="382" y="126" r="50" text-anchor="middle" font-size="90" font-family="Verdana" fill="white">"</text>
              <g>
                  <rect x="0" y="0" width="${width}" height="auto"></rect>
                  <text id="lastLineQuote" x="375" y="120" font-family="Verdana" font-size="35" fill="white" text-anchor="middle">
                      ${formattedQuote}
                      <tspan class="quoteAuthorStyles" x="375" dy="1.8em">- ${quoteAuthor}</tspan>
                  </text>
              </g>
              <text x="${width / 2}" y="${height - 10}" class="footerStyles">Developed by @EricMadureira | Quotes from ZenQuotes.io</text>
          </svg>
        `;

        // Add background for the svg creation
        const backgroundImages = [
          "backgrounds/UltraViolet.png",
          "backgrounds/MoonlitAsteroid.png",
        ];
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        const seletectedBackground = backgroundImages[randomIndex];

        // Compose image
        const svgBuffer = Buffer.from(svgImage);
        const imagePath = path.join('/tmp', 'quote-card.png');
        await sharp(seletectedBackground)
            .composite([{
                input: svgBuffer,
                top: 0,
                left: 0,
                }])
            .toFile(imagePath);

        // Function: Update DynamoDB object in table
        try {
            updateQuoteTable();
        } catch (error) {
            console.log("Error updating Quote obejct in DynamoDB:", error)
        }

        return {
            statusCode: 200,
        //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "image/png"
        },
            body: fs.readFileSync(imagePath).toString('base64'),
            isBase64Encoded: true
        };
    }

    return await getRandomQuote(API_URL);
};
