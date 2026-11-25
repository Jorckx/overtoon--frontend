import { formatDate, DATE_FORMATS } from "#lib/utils/formatDate.js";
const NNBSP = '\u202F'; // narrow no-break space

export function formatPeriod(period) {
	const start = period.start ? formatDate(period.start, DATE_FORMATS.compact) : '';
	const end = period.end
		? `${NNBSP}–${NNBSP}${formatDate(period.end, DATE_FORMATS.compact)}`
		: `${NNBSP}–${NNBSP}...`;

	return `${start}${end}`.trim();
}
