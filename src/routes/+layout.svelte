<script lang="ts">
	import '@appwrite.io/pink';
	// optionally, add icons
	import '@appwrite.io/pink-icons';
</script>

<header class="main-header u-padding-inline-end-0 astro-6RXD34BR">
	<a class="logo astro-6RXD34BR" href="/">
		<h2 class="heading-level-2 u-margin-inline-start-16">rezervuj<b class="pink">to</b></h2>
	</a>
	<div class="main-header-end u-margin-inline-end-16 astro-6RXD34BR">
		<ul class="buttons-list is-with-padding astro-6RXD34BR">
			<li class="buttons-list-item is-not-mobile u-padding-inline-0 astro-6RXD34BR">
				<a
					href="https://github.com/appwrite/pink"
					title="GitHub"
					target="_blank"
					rel="noopener noreferrer"
					class="button is-text astro-6RXD34BR"
				>
					<span class="icon-github astro-6RXD34BR" aria-hidden="true" />
					<span class="text astro-6RXD34BR">GitHub</span>
				</a>
			</li>
		</ul>
	</div>
</header>

<!-- <header class="main-header u-padding-inline-end-0 astro-6RXD34BR">
	<h2 class="heading-level-2">rezervuj<b class="pink">to</b></h2>
	<div class="main-header-end u-margin-inline-end-16 astro-6RXD34BR">
		<ul class="buttons-list is-with-padding astro-6RXD34BR">
			<li class="buttons-list-item is-not-mobile u-padding-inline-0 astro-6RXD34BR">
				<a
					href="https://github.com/appwrite/pink"
					title="GitHub"
					target="_blank"
					rel="noopener noreferrer"
					class="button is-text astro-6RXD34BR"
				>
					<span class="icon-github astro-6RXD34BR" aria-hidden="true" />
					<span class="text astro-6RXD34BR">GitHub</span>
					<span class="tag u-text-center astro-6RXD34BR">270</span>
				</a>
			</li>
		</ul>
	</div>
</header> -->

<slot />

<style>
	.pink {
		color: hsl(var(--color-primary-100));
	}
</style>
