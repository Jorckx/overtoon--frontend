import { defineEnvVars } from '@sveltejs/kit/env';

// @migration-task Review usage of dynamic environment variables. They fall back to the empty string if not present, which may not be what you want.
export const variables = defineEnvVars({
	KIRBY_API_URL: { schema: (input) => input ?? '' },
  KIRBY_BEARER_TOKEN: { schema: (input) => input ?? '' },
  AUTH: { schema: (input) => input ?? '' },
  MODE: { schema: (input) => input ?? '' },
	ADMIN_LOGIN: { schema: (input) => input ?? '' }
});
