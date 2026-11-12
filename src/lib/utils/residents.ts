export type Period = { start?: string; end?: string };
export type ResidentInput = { id: string; title: string; periods?: Period[] };

const toTime = (v?: string) => {
	if (!v) return null;
	const t = new Date(v).getTime();
	return Number.isNaN(t) ? null : t;
};

/**
 * Pick current residents (period active at `now`, empty end = open-ended).
 * If none, fall back to the `limit` most recently ended residents.
 * Each returned resident gets a single `period` (the active one, else the last-ending one).
 */
export function splitResidents<T extends ResidentInput>(residents: T[], now: number, limit = 5) {
	const normalized = residents.flatMap((r) => {
		const periods = (r.periods ?? [])
			.map((p) => ({ start: toTime(p.start), end: toTime(p.end), raw: p }))
			.filter((p) => p.start !== null || p.end !== null);
		if (!periods.length) return [];
		const isActive = (p: (typeof periods)[number]) =>
			(p.start === null || p.start <= now) && (p.end === null || p.end >= now);
		const chosen =
			periods.find(isActive) ??
			[...periods].sort((a, b) => (b.end ?? b.start ?? 0) - (a.end ?? a.start ?? 0))[0];
		return [{ ...r, period: chosen.raw, endT: chosen.end, active: isActive(chosen) }];
	});

	const strip = ({ endT, active, ...rest }: (typeof normalized)[number]) => rest;

	const current = normalized.filter((r) => r.active);
	if (current.length) return { residents: current.map(strip), mode: 'current' as const };

	const past = normalized
		.filter((r) => r.endT !== null && r.endT < now)
		.sort((a, b) => (b.endT as number) - (a.endT as number))
		.slice(0, limit);
	return { residents: past.map(strip), mode: 'past' as const };
}
