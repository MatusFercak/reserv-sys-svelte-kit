<script lang="ts">
	import { page } from '$app/stores';
	let hours: any = [];
	for (let i = 0; i <= 23; i++) {
		hours = [
			...hours,
			{
				i
			}
		];
	}
</script>

<main class="main-content">
	<div class="top-cover u-padding-block-end-56 astro-DCNASTZX">
		<!-- svelte-ignore missing-declaration -->
		<div class="container cover-padding-top-big-screen astro-DCNASTZX">
			{$page.params.dayID}
		</div>
	</div>
	<div class="container u-margin-block-start-negative-56">
		<ul class="u-flex u-flex-vertical u-gap-16">
			{#each hours as hour}
				<li class="u-main-center">
					<label class="card is-allow-focus u-cursor-pointer" style="--card-padding:1rem">
						<div class="u-flex u-gap-16">
							<input type="radio" name="plan" />
							<div class="u-flex u-flex-vertical u-gap-4">
								<h4 class="body-text-2">Pro plan</h4>
								<p class="u-color-text-gray">
									For projects you want to scale easily.
									<b>$25/month + Add-ons</b>
								</p>
							</div>
							<span class="icon-lightning-bolt u-margin-inline-start-auto" aria-hidden="true" />
						</div>
					</label>
				</li>
			{/each}
		</ul>
	</div>
</main>
