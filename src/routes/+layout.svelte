<script lang="ts">
	import { AppwriteServices } from '$lib/appwrite';
	import { currentAccount, path } from '$lib/stores';
	import '@appwrite.io/pink';
	import '@appwrite.io/pink-icons';
	import { onMount } from 'svelte';
	let account: any;

	function login() {
		AppwriteServices.login();
	}

	function logout() {
		AppwriteServices.logout();
	}

	onMount(() => {
		path.set(window.location.href);

		console.log(window.location.href);
		try {
			AppwriteServices.getAccount();
			currentAccount.subscribe((value: any) => {
				account = value;
				console.log(value);
			});
		} catch {
			account = 0;
		}
	});
</script>

<header class="main-header u-padding-inline-end-0 astro-6RXD34BR">
	<a class="logo astro-6RXD34BR" href="/">
		<h2 class="heading-level-2 u-margin-inline-start-16">rezervuj<b class="pink">to</b></h2>
	</a>

	<div class="main-header-end u-margin-inline-end-16 astro-6RXD34BR">
		<ul class="buttons-list is-with-padding astro-6RXD34BR">
			<li class="buttons-list-item is-not-mobile u-padding-inline-0 astro-6RXD34BR">
				{#if account}
					{#if account != 0}
						<a
							href="/profile"
							title="Logout"
							rel="noopener noreferrer"
							class="button is-text astro-6RXD34BR"
						>
							<span class="icon-google astro-6RXD34BR" aria-hidden="true" />
							<span class="text astro-6RXD34BR">{account.name}</span>
						</a>
					{/if}
				{:else if account == 0}
					<!-- <a
						on:click={() => {
							login();
						}}
						href="/"
						title="Login"
						rel="noopener noreferrer"
						class="button is-text astro-6RXD34BR"
					>
						<span class="icon-google astro-6RXD34BR" aria-hidden="true" />
						<span class="text astro-6RXD34BR">Google Login</span>
					</a> -->
					<a
						href="https://rezervujto.authui.site/"
						title="Login"
						rel="noopener noreferrer"
						class="button is-text astro-6RXD34BR"
					>
						<span class="icon-google astro-6RXD34BR" aria-hidden="true" />
						<span class="text astro-6RXD34BR">Login</span>
					</a>
				{/if}
			</li>
			{#if account}
				{#if account != 0}
					<li class="buttons-list-item is-not-mobile u-padding-inline-0 astro-6RXD34BR">
						<!-- <a
							on:click={() => {
								logout();
							}}
							href="/"
							title="Logout"
							rel="noopener noreferrer"
							class="button is-text astro-6RXD34BR"
						>
							<span class="text astro-6RXD34BR">Log out</span>
						</a> -->
						<a
							href="https://rezervujto.authui.site/"
							title="Logout"
							rel="noopener noreferrer"
							class="button is-text astro-6RXD34BR"
						>
							<span class="text astro-6RXD34BR">Manage account</span>
						</a>
					</li>
				{/if}
			{/if}
		</ul>
	</div>
</header>

<slot />

<footer class="main-footer u-cross-center">
	<div class="main-footer-start">
		<ul class="inline-links is-no-padding-first-and-last u-x-small">
			<li class="inline-links-item">
				<div class="u-flex u-cross-center u-gap-8">
					<span class="icon-github svelte-1ngh1xn" />
					<a class="text" href="https://github.com/MatusFercak" target="_blank" rel="noreferrer"
						>GitHub</a
					>
				</div>
			</li>
		</ul>
	</div>
	<div class="main-footer-end">
		<ul class="inline-links is-no-padding-first-and-last u-x-small">
			<li class="inline-links-item">
				<span class="text">ⓒ 2023 rezervujto. All rights reserved.</span>
			</li>
		</ul>
	</div>
</footer>

<style>
	.pink {
		color: hsl(var(--color-primary-100));
	}
</style>
