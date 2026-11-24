<script lang="ts">
	let email = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let message = $state('');

	function toResponse(value: unknown): { result?: unknown } {
		return typeof value === 'object' && value !== null && 'result' in value
			? { result: value.result }
			: {};
	}


	async function onsubmit(e: SubmitEvent) {
		e.preventDefault();
		status = 'loading';
		try {
			const res = await fetch('/api/mailchimp', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			const data = toResponse(await res.json());

			if (data.result === 'success') {
				status = 'success';
				message = 'Bedankt! Check je mailbox om je inschrijving te bevestigen.';
				email = '';
			} else if (data.result === 'exists') {
				status = 'error';
				message = 'Dit e-mailadres is al ingeschreven.';
			} else if (data.result === 'blocked') {
				status = 'error';
				message = 'Dit e-mailadres kan niet opnieuw worden ingeschreven. Neem contact met ons op.';
			} else {
				status = 'error';
				message = 'Er ging iets mis. Controleer je e-mailadres en probeer opnieuw.';
			}
		} catch {
			status = 'error';
			message = 'Er ging iets mis. Probeer het later opnieuw.';
		}
	}
</script>

<div class="subscribe">
	<form class="subscribe-form" {onsubmit}>
		<input
			type="email"
			name="EMAIL"
			class="subscribe-input"
			placeholder="E-mail adres"
			required
			bind:value={email}
			disabled={status === 'loading'}
		/>
		<button type="submit" class="subscribe-button" disabled={status === 'loading'}>
			submit
		</button>
	</form>
	{#if message}
		<p class="subscribe-message" role="status" data-status={status}>{message}</p>
	{/if}
</div>

<style>
   	@reference '#lib/styles/app.css';

    .subscribe {
        @apply  mr-auto relative text-black w-full font-tz;
	}
	.subscribe-title {
	    @apply text-base leading-none text-left font-normal;

	}
	.subscribe-message {
	    @apply mt-1 text-xs text-black/60;
	}
	.subscribe-form {
	    @apply grid grid-cols-[1fr_auto] gap-x-main items-end;
	}
	input[type='email'] {
	    @apply leading-loose border-b border-dotted border-b-black/30 text-black/60 text-base ;
	}
	input[type='email']:active,
	input[type='email']:target,
	input[type='email']:focus {
	    @apply outline-none text-black border-black/50 bg-transparent ;
	}
	.subscribe-button {
	    @apply text-base cursor-pointer ;
	}
</style>
