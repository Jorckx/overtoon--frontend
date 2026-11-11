// src/lib/utils/date.ts
export function formatDate(
	value: string | Date,
	options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' },
	locale = 'nl-BE'
): string {
	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) return '';

	return new Intl.DateTimeFormat(locale, {
		timeZone: 'Europe/Brussels',
		...options
	}).format(date);
}
