// src/lib/utils/date.ts
export const DATE_FORMATS = {
	long: { day: 'numeric', month: 'long', year: 'numeric' },
	short: { day: 'numeric', month: 'short', year: 'numeric' },
	compact: { day: '2-digit', month: '2-digit', year: '2-digit' },
	start: { day: '2-digit', month: '2-digit' }
} satisfies Record<string, Intl.DateTimeFormatOptions>;
export function formatDate(
	value: string | Date,
	options: Intl.DateTimeFormatOptions = DATE_FORMATS.long,
	locale = 'nl-BE',
	separator = '.'
): string {
	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) return '';

	const formatter = new Intl.DateTimeFormat(locale, {
		timeZone: 'Europe/Brussels',
		...options
	});

	if (separator === undefined) return formatter.format(date);

	return formatter
		.formatToParts(date)
		.map((part) => (part.type === 'literal' ? separator : part.value))
		.join('');
}
