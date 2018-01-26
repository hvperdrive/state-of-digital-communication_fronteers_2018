# The State of Digital Communication
Code for "The State of Digital Communication" talk on Fronteers (25/01/2018)  Simple VueJS app + Node server that connects to the Dialogfow API

## Dependencies

* Node
* [Ngrok](https://ngrok.com/download)

## Code usage

**Install the dependencies**

- `npm i` (Node dependencies)
- `cd ./app && npm i` (App dependencies)

**Start the application**

- `npm start`

**Open the application in the browser**

- `http://localhost:4000/`


## Project structure

* **Server**: NodeJS server.
* **App**: VueJS application.


## DialogFlow

- Create a project in the DialogFlow Console
- Make sure to add the `clientAccessToken` and `developerAccessToken` in the `./config/dialogflow.conf.js` file.
