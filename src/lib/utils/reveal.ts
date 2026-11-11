export interface RevealOptions {
	delay?: number;
  from?: string; // any CSS transform, e.g. 'translateX(-3rem) scale(0.95)'
  duration?: string;
  opacityDuration?: string;
	effect?: string; // name of a preset defined in CSS
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
}

const observers = new Map<string, IntersectionObserver>();
const callbacks = new WeakMap<Element, (visible: boolean) => void>();

function getObserver(threshold: number, rootMargin: string) {
	const key = `${threshold}|${rootMargin}`;
	let observer = observers.get(key);
	if (!observer) {
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					callbacks.get(entry.target)?.(entry.isIntersecting);
				}
			},
			{ threshold, rootMargin }
		);
		observers.set(key, observer);
	}
	return observer;
}

export default function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const {
		delay = 0,
    from,
    duration,
		opacityDuration,
		effect = '',
		threshold = 0.15,
		rootMargin = '0px 0px -10% 0px',
		once = true
	} = options;
	const observer = getObserver(threshold, rootMargin);

	node.dataset.reveal = effect;
	node.style.setProperty('--reveal-delay', `${delay}ms`);
  if (from) node.style.setProperty('--reveal-from', from);
	if (duration) node.style.setProperty('--duration', duration)
	if (opacityDuration) node.style.setProperty('--opacity-duration', opacityDuration)

	callbacks.set(node, (visible) => {
		if (visible) {
			node.dataset.revealed = '';
			if (once) {
				observer.unobserve(node);
				callbacks.delete(node);
			}
		} else if (!once) {
			delete node.dataset.revealed;
		}
	});

	// commit the hidden state before observing, so there's something to transition from
	void node.offsetHeight;
	requestAnimationFrame(() => observer.observe(node));

	return {
		destroy() {
			observer.unobserve(node);
			callbacks.delete(node);
		}
	};
}
