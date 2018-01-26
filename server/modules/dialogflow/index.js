// Imports
// ------------------------------------------------------------------------- /
const request = require("request-promise-native");

// Class Definition
// ------------------------------------------------------------------------- /
class DialogFlow {

	constructor(
		clientAccessToken,
		developerAccessToken,
		protocolVersion
	) {
		this.clientAccessToken = clientAccessToken;
		this.developerAccessToken = developerAccessToken;
		this.protocolVersion = protocolVersion;
	}

	sendQuery(query) {
		return request({
			url: "https://api.dialogflow.com/v1/query",
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${this.clientAccessToken}`,
			},
			qs: {
				sessionId: "1234",
				lang: "en",
				query: query,
				v: this.protocolVersion,
			},
			json: true, // Parse the result as JSON
		});
	}
}


module.exports = DialogFlow;
