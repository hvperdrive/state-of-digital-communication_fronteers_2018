Vue.component("messages", {
	props: [
		"text",
	],
	created: function () {
		this.$parent.$on("scroll-down", () => {
			if (this.$refs.messageContainer) {
				this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
			}
		});
	},
	template: `
		<div class="m-messages" ref="messageContainer">
			<slot></slot>
		</div>
	`,
});
