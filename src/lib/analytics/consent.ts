let opener: (() => void) | undefined;

export const consent = {
	register(fn: (() => void) | undefined) {
		opener = fn;
	},
	show() {
		opener?.();
	}
};
