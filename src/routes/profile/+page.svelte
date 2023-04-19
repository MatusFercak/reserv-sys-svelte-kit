<script lang="ts">
	import { AppwriteServices } from '$lib/appwrite';
	import { monthNames } from '$lib/constant';
	import { currentAccount } from '$lib/stores';
	import { onMount } from 'svelte';
	let data: any;
	let account: any;
	let trigger: boolean = false;
	let reservations: any = [];

	function getAvatar() {
		if (account) {
			let nameArr = account.name.split(' ');
			console.log(nameArr[0].substring(0, 1));
			return `${nameArr[0].substring(0, 1)}${nameArr[1].substring(0, 1)}`;
		}
	}

	function getTitle(reservation: any) {
		let date = new Date(
			reservation.$id.substring(0, 4),
			reservation.$id.substring(4, 6),
			reservation.$id.substring(6, 8)
		);
		let title = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
		let dayTime = `${date.toLocaleString('default', { weekday: 'long' })} ${reservation.time}`;
		return [title, dayTime];
	}

	function cancleReservation(reservationDoc: any) {
		for (let reservation of reservations) {
			if (reservationDoc.$id == reservation.$id) {
				reservations = reservations.filter((obj: any) => {
					return obj.$id != reservationDoc.$id;
				});
				AppwriteServices.deleteReservation(reservationDoc);
			}
		}

		trigger = !trigger;
	}
	onMount(async () => {
		try {
			await AppwriteServices.getAccount();
			currentAccount.subscribe((value: any) => {
				account = value;
			});
		} catch {
			account = 0;
		}
		data = await AppwriteServices.getReservationsByEmail(account.email);
		reservations = data.documents;
		console.log(data);
	});
</script>

<main class="main-content">
	<div class="top-cover u-padding-block-end-5 astro-DCNASTZX">
		<div class="container cover-padding-top-big-screen astro-DCNASTZX">
			<h4 class="heading-level-4">User profile</h4>
			<p>Preview of your reservations</p>
		</div>
	</div>
	<div class="container u-margin-block-start-negative-56">
		{#if account}
			{#if account != 0}
				<div class="card">
					<div class="user-profile">
						<span class="avatar">{getAvatar()}</span>
						<span class="user-profile-info">
							<span class="name">{account.name}</span>
							<div class="interactive-text-output u-padding-inline-0">
								<span class="text">{account.email}</span>
							</div>
						</span>
					</div>
				</div>
			{/if}
		{/if}
	</div>
	<div class="container">
		<ul
			class="grid-box"
			style="--grid-gap:2rem; --grid-item-size:18rem; --grid-item-size-small-screens:16rem;"
		>
			{#each reservations as reservation}
				<li>
					<div class="card">
						<div class="grid-item-1">
							<div class="grid-item-1-start-start">
								<div class="eyebrow-heading-3">
									{getTitle(reservation)[0]}
									<b class="pink">{getTitle(reservation)[1]}</b>
								</div>
							</div>
							<div class="grid-item-1-end-start">
								<div class="u-flex u-gap-16 u-flex-wrap">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-missing-attribute -->

									<button
										class="tag"
										on:click={() => {
											cancleReservation(reservation);
										}}
									>
										<span class="text">cancle</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</main>

<style>
	.pink {
		color: hsl(var(--color-primary-100));
	}
</style>
