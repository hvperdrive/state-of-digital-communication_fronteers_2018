Vue.component("message", {
	props: {
		text: String,
		type: String,
		loading: {
			type: Boolean,
			default: false,
		},
	},
	created: function () {
		const messageDOM = this.$refs.message;

		if (messageDOM) {
			messageDOM.scrollintoView(false);
		}
	},
	methods: {
		getMessageAnimationClass: (type) => {
			if (type === "local") {
				return "slideInLeft";
			} else if (
				type === "remote" ||
				type === "error") {
				return "slideInRight";
			}
		},
	},
	template: `
		<div class="m-message-wrapper" :class="['is-' + type]">
			<p class="m-message animated" ref="message" v-bind:class="getMessageAnimationClass(type)">
				<template v-if="loading">
					<div class="a-animated-dots"></div>
				</template>
				<template v-else>
					<span v-html="text"></span>
				</template>
			</p>
		</div>
	`,
});
