import { error } from '@sveltejs/kit';
import { KIRBY_API_URL, KIRBY_BEARER_TOKEN } from '$app/env/private';
import { DEFAULT_LANG } from './i18n';

/**
 * Execute KQL query against Kirby CMS
 * @param {object} query - The KQL query object
 * @param {string} lang - The active language code (e.g., 'nl', 'en')
 * @returns {Promise<any>} The response data from Kirby CMS
 */
export async function useKqlQuery(query: object, lang: string = DEFAULT_LANG) {
	const apiUrl = KIRBY_API_URL || 'http://localhost:8000';
	const bearerToken = KIRBY_BEARER_TOKEN || 'test';

	if (!bearerToken) {
		throw new Error('KIRBY_BEARER_TOKEN is not configured');
	}

	try {
		const response = await fetch(`${apiUrl}/api/kql`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
				'X-Language': lang // Pass the language header to Kirby
			},
			body: JSON.stringify(query)
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		// KQL returns data in a specific format, extract the result
		if (data.code && data.code !== 200) {
			throw new Error(`KQL error: ${data.message || 'Unknown error'}`);
		}

		return data.result;
	} catch (err) {
		console.error('Failed to execute KQL query:', err);
		throw error(500, 'Failed to load data from CMS');
	}
}
