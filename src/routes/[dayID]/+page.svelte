<script lang="ts">
	import { page } from '$app/stores';
	import { AppwriteServices } from '$lib/appwrite';
	import { monthNames } from '$lib/constant';
	import { ReservationGenerator } from '$lib/reservationGenerator';
	import { currentAccount, currentDay } from '$lib/stores';
	import { onMount } from 'svelte';
	const dayID: string = $page.params.dayID.toString();
	const currentDayNow: any = new Date(
		`${dayID.substring(0, 4)}-${dayID.substring(5, 6)}-${dayID.substring(6, 8)}`
	);
	let trigger: any = true;
	let reservations: any = ReservationGenerator.getReservations(dayID, currentDay);

	function createReservation(reservationID: any) {
		for (let reservation of reservations) {
			if (reservationID == reservation.reservationID) {
				console.log(reservationID);
				trigger = !trigger;

				reservation.isReserv = true;
				reservation.name = $currentAccount.name;
				reservation.email = $currentAccount.email;
				console.log(reservation);
				AppwriteServices.createReservation(reservation);
			}
		}
	}
	function cancleReservation(reservationID: any) {
		for (let reservation of reservations) {
			if (reservationID == reservation.reservationID) {
				console.log(reservationID);
				trigger = !trigger;

				reservation.isReserv = false;
				reservation.name = undefined;
				reservation.email = undefined;
				console.log(reservation);
				AppwriteServices.deleteReservation(reservation);
			}
		}
	}
	onMount(async () => {
		const data = await AppwriteServices.getReservations(dayID.toString());
		console.log(data);
		reservations = ReservationGenerator.getReservations(dayID, currentDay, data.documents);
	});
</script>

<main class="main-content">
	<div class="top-cover u-padding-block-end-56 astro-DCNASTZX">
		<!-- svelte-ignore missing-declaration -->
		<div class="container cover-padding-top-big-screen astro-DCNASTZX">
			<h4 class="eyebrow-heading-1 pink">
				{currentDayNow.getDate()}
				{monthNames[currentDayNow.getMonth()]}
				{currentDayNow.getFullYear()}
			</h4>
			<h4 class="heading-level-4">
				{currentDayNow.toLocaleString('default', { weekday: 'long' })}
			</h4>
			<p>book your appointment today</p>
		</div>
	</div>
	<div class="container u-margin-block-start-negative-56">
		<ul
			class="grid-box"
			style="--grid-gap:2rem; --grid-item-size:18rem; --grid-item-size-small-screens:16rem;"
		>
			{#key trigger}
				{#each reservations as reservation}
					<li>
						<div class="card">
							<div class="grid-item-1">
								<div class="grid-item-1-start-start">
									<div class="eyebrow-heading-3">
										<h4
											class="eyebrow-heading-1 {$currentAccount.email
												? reservation.email == $currentAccount.email
													? 'pink'
													: ''
												: ''}"
										>
											{reservation.time}
										</h4>
									</div>
								</div>
								{#if currentDayNow >= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
									<div class="grid-item-1-end-start">
										<div class="u-flex u-gap-16 u-flex-wrap">
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<!-- svelte-ignore a11y-missing-attribute -->
											{#if reservation.isReserv}
												{#if reservation.email == $currentAccount.email}
													<button
														class="tag"
														on:click={() => {
															cancleReservation(reservation.reservationID);
														}}
													>
														<span class="text">cancle</span>
													</button>
												{:else if $currentAccount}
													<button
														class="tag"
														on:click={() => {
															createReservation(reservation);
														}}
														disabled
													>
														<span class="text">book now</span>
													</button>
												{/if}
											{:else if $currentAccount}
												<button
													class="tag"
													on:click={() => {
														createReservation(reservation.reservationID);
													}}
												>
													<span class="text">book now</span>
												</button>
											{/if}
										</div>
									</div>
									<div class="grid-item-1-end-end">
										<ul class="icons u-flex u-gap-8">
											<li>
												{#if reservation.isReserv}
													<span
														class="icon-lock-closed"
														aria-hidden="true"
														aria-label="Secure [OR] unsecure"
													/>
												{:else}
													<span
														class="icon-lock-open pink"
														aria-hidden="true"
														aria-label="Secure [OR] unsecure"
													/>
												{/if}
											</li>
										</ul>
									</div>
								{/if}
							</div>
						</div>
					</li>
				{/each}
			{/key}
		</ul>
	</div>
</main>

<style>
	.pink {
		color: hsl(var(--color-primary-100));
	}
	.pink-background {
		background-color: hsl(var(--color-primary-200));
	}
</style>
