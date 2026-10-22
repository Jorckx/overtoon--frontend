import { defineParams } from '@sveltejs/kit/params';

export const params = defineParams({
	// Only non-default languages get a URL prefix (en lives at the root)
	lang: (param) => (param === 'nl' ? param : undefined)
});
