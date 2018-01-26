// Imports
// ------------------------------------------------------------------------- /
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const dialogFlowConfig = require("../config/dialogflow.conf");
const DialogFlow = require("./modules/dialogflow");

// Configure Dialogflow module
const dialogFlow = new DialogFlow(
	dialogFlowConfig.clientAccessToken,
	dialogFlowConfig.developerAccessToken,
	dialogFlowConfig.protocolVersion
);

// Express Setup
// ------------------------------------------------------------------------- /

// parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve VueJS App
app.get("/", (req, res) => {
	res.sendFile(process.cwd() + "/app/index.html");
});
app.use("/app", express.static(process.cwd() + "/app"));


// Routes
// ---
// Provide routes for handling:
// * The query request from the VueJS app
// * The intent fulfillment from DialogFlow
// ------------------------------------------------------------------------- /

// Request Intent
// GET /api/query/:query
// ------------------------------------------------------------------------- /
app.get("/api/query/:query", (req, res) => {
	const query = req.params.query;

	// Send this over to DialogFlow
	dialogFlow.sendQuery(query)
		.then((queryResult) => {

			// Create the message payload
			const message = {
				id: queryResult.id,
				type: "remote",
				text: queryResult.result.fulfillment.displayText || queryResult.result.fulfillment.speech,
				speech: queryResult.result.fulfillment.speech,
			};

			// Delay the message depending on the length of the message;
			// Average about 200 chars per minute.
			const averageTypingSpeed = 200;
			const botAverageTypingSpeed = averageTypingSpeed * 2;
			let typingDuration = message.text.length / botAverageTypingSpeed * 60 * 1000;

			// Never wait longer than 3 seconds,
			// or the user gets super bored...
			if (typingDuration > 3000) {
				typingDuration = 3000;
			}

			setTimeout(() => {
				res.status(200).json(message);
			}, typingDuration);

		})
		.catch((error) => {
			// Handle errors here
			// (╯°□°）╯︵ ┻━┻
			console.log(error);

			res.status(500).json({});
		});
});


// Intent fullfilment from DialogFlow
// POST /api/intent
// ------------------------------------------------------------------------- /
app.post("/api/intent", (req, res) => {
	// Dynamically handle intents here
	res.status(200).json({});
});



// Start server
// ------------------------------------------------------------------------- /
app.listen(4000, () => console.log("Chatbot Demo Server listening on port 4000!"));
