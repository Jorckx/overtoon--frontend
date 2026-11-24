import { json } from '@sveltejs/kit';
import { MAILCHIMP_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const dc = 'us16';
const listId = 'f60bdcc431';
const emailPattern = /^\S+@\S+\.\S+$/;

const existsTitle = 'Member Exists';
const blockedTitles = ['Forgotten Email Not Subscribed', 'Member In Compliance State'];

type MailchimpError = { title?: string; detail?: string };

function toMailchimpError(value: unknown): MailchimpError {
	if (typeof value !== 'object' || value === null) return {};
	return {
		title: 'title' in value && typeof value.title === 'string' ? value.title : undefined,
		detail: 'detail' in value && typeof value.detail === 'string' ? value.detail : undefined
	};
}

function toEmail(value: unknown): string {
	if (typeof value !== 'object' || value === null || !('email' in value)) return '';
	return typeof value.email === 'string' ? value.email.trim() : '';
}

export const POST: RequestHandler = async ({ request, fetch }) => {
	const email = toEmail(await request.json().catch(() => null));

	if (!emailPattern.test(email)) {
		return json({ result: 'error', msg: 'invalid email' }, { status: 400 });
	}

	try {
		const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${MAILCHIMP_API_KEY}`,
				'Content-Type': 'application/json'
			},
			// pending = double opt-in (Mailchimp sends the confirmation email)
			body: JSON.stringify({ email_address: email, status: 'pending' })
		});

		if (res.ok) return json({ result: 'success' });

		const { title, detail } = toMailchimpError(await res.json().catch(() => null));

		if (title === existsTitle) return json({ result: 'exists' });
		if (title && blockedTitles.includes(title)) return json({ result: 'blocked' });

		console.error('mailchimp error', res.status, title, detail);
		return json(
			{ result: 'error', msg: title ?? 'unknown' },
			{ status: res.status >= 500 ? 502 : res.status }
		);
	} catch (err) {
		console.error('mailchimp subscribe failed', err);
		return json({ result: 'error', msg: 'upstream failure' }, { status: 502 });
	}
};
