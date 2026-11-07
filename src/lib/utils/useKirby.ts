import { error } from '@sveltejs/kit';
import { KIRBY_API_URL, KIRBY_BEARER_TOKEN } from '$app/env/private';
// import { getLocale } from '#lib/paraglide/runtime.js';
// import { DEFAULT_LANG } from './i18n';

export type KqlQuery = {
	query: string;
	select?: Record<string, unknown> | string[] | string;
	pagination?: { page?: number; limit?: number };
};

/** Shape of paginated KQL results */
export type KqlPaginated<T> = {
	data: T[];
	pagination: {
		page: number;
		pages: number;
		offset: number;
		limit: number;
		total: number;
	};
};

type KqlResponse<T> = {
	code?: number;
	status?: string;
	message?: string;
	result: T;
};

/**
 * Execute KQL query against Kirby CMS
 * @param {object} query - The KQL query object
 * @param {string} lang - The active language code (e.g., 'nl', 'en')
 * @returns {Promise<any>} The response data from Kirby CMS
 */

export async function useKqlQuery<T = unknown>(
	query: KqlQuery,
  lang: string | null = null
): Promise<T> {
	const apiUrl = KIRBY_API_URL || 'http://localhost:8000';
	const bearerToken = KIRBY_BEARER_TOKEN || 'test';
	console.log('KQL:', query.query);
	if (!bearerToken) {
		throw new Error('KIRBY_BEARER_TOKEN is not configured');
	}

	try {
		const response = await fetch(`${apiUrl}/api/kql`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
        ...(lang ? { 'X-Language': lang } : {})
			},
			body: JSON.stringify(query)
		});

		if (!response.ok) {
			// throw new Error(`HTTP error! status: ${response.status}`);
			const body = await response.text();
			throw new Error(`HTTP ${response.status}: ${body}`);
		}

		const data = await response.json() as KqlResponse<T>;

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


// for preview links in the panel to work
export type PreviewParams = { token: string; version: string } | null;
export function getPreview(url: URL): PreviewParams {
	const token = url.searchParams.get('_token');
	const version = url.searchParams.get('_version');
	if (!token || version !== 'changes' || !/^[a-z0-9]+$/i.test(token)) return null;
	return { token, version };
}

/** Swaps a leading page('x') for preview('x', token, version); other queries pass through */
export function withPreview(kql: KqlQuery, preview: PreviewParams): KqlQuery {
	if (!preview) return kql;
	return {
		...kql,
		query: kql.query.replace(
			/^page\((['"])(.+?)\1\)/,
			(_, __, id) => `preview('${id}', '${preview.token}', '${preview.version}')`
		)
	};
}
