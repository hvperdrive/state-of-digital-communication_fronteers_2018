window.addEventListener("load", () => {
	const app = new Vue({
		el: "#app",
		data: {
			message: "",
			messages: [],
		},
		created: function () {
			// Run the intro when the component is created

			// Add message to queue
			this.addTypingMessage();

			setTimeout(() => {
				this.messages.pop();
				this.addMessage({
					id: Date.now(),
					type: "remote",
					text: "Oh hey, didn't see you there! 👋",
				});
			}, 1500);

			setTimeout(() => {
				this.addTypingMessage();
			}, 2000);

			setTimeout(() => {
				this.messages.pop();
				this.addMessage({
					id: Date.now(),
					type: "remote",
					text: "I'm Fabi's Bot. 🙆‍♂️",
				});
			}, 2750);
		},
		methods: {

			// Add a "user is typing" message.
			addTypingMessage: function () {
				this.messages.push({
					id: Date.now(),
					type: "remote",
					loading: true,
				});

				// Scroll down
				this.$emit("scroll-down");
			},

			// Add a message
			addMessage: function (message) {
				this.messages.push(message);

				// Scroll down
				this.$emit("scroll-down");
			},

			handleErrorMessage: function () {
				const errorMessage1 = {
					id: Date.now(),
					type: "error",
					text: "Something's wrong with my brain... It's... *bzzzzt*",
				};
				const errorMessage2 = {
					id: errorMessage1.id + 1,
					type: "error",
					text: "💀 ⚰️ 💀",
				};

				// Push error response
				this.addMessage(errorMessage1);

				setTimeout(() => {
					this.addMessage(errorMessage2);
				}, 1000);
			},

			onSubmit: function () {
				const message = app.message;

				// Add message to queue
				this.addMessage({
					id: Date.now(),
					type: "local",
					text: app.message,
				});

				// Push "is typing"
				setTimeout(() => {
					this.addTypingMessage();

					// Send the message to the server.
					fetch(`/api/query/${message}`)
						.then((response) => response.json())
						.then((response) => {

							// Remove "is-typing"
							app.messages.pop();

							if (!response.text) {
								this.handleErrorMessage();
								return;
							}

							// Push actual response
							this.addMessage(response);
						})
						.catch(() => {
							// Remove "is-typing"
							app.messages.pop();

							this.handleErrorMessage();
						});
				}, 1000);


				// Clear the message
				Vue.set(app, "message", "");
			},
		},
	});


});
