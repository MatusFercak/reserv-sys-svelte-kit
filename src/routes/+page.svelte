<script lang="ts">
	import { daysConst, monthNames } from '../lib/constant';
	import { CalendarGenerator } from '$lib/calendarGenerator';
	let month = new Date().getMonth();
	let year = new Date().getFullYear();
	let days: any = CalendarGenerator.getCalendar(year, month);

	function nextMonth() {
		month += 1;
		if (month == 12) {
			month = 0;
			year += 1;
		}
	}
	function previusMonth() {
		month -= 1;
		if (month == -1) {
			month = 11;
			year -= 1;
		}
	}

	$: if (month) {
		days = CalendarGenerator.getCalendar(year, month);
	}
</script>

<main class="main-content">
	<div class="top-cover u-padding-block-end-56 astro-DCNASTZX">
		<div class="container cover-padding-top-big-screen astro-DCNASTZX">
			<nav class="pink-pager u-flex u-main-space-between u-padding-block-12 astro-COHSB7B2">
				<button
					class="button is-text"
					on:click={() => {
						previusMonth();
					}}
					><span class="icon-cheveron-left astro-COHSB7B2" />
					<span class="text u-capitalize astro-COHSB7B2">Previus month</span></button
				>
				<div class="is-text u-text-center">
					<h4 class="heading-level-4">{monthNames[month]} {year}</h4>
				</div>
				<button
					class="button is-text"
					on:click={() => {
						nextMonth();
					}}
					><span class="text">Next month</span>
					<span class="icon-cheveron-right" aria-hidden="true" /></button
				>
			</nav>
		</div>
	</div>
	<div class="container u-margin-block-start-negative-56">
		<ul
			class="grid-box"
			style="--grid-gap:1rem; --grid-item-size:9rem; --grid-item-size-small-screens:10rem;"
		>
			{#each daysConst as day}
				<li>
					<div class="card pink-body u-text-center">
						<p>
							<b>{day.dayName}</b>
						</p>
					</div>
				</li>
			{/each}
			{#each days as day}
				<li>
					<a href="/{day.dayID}">
						<div class="card {day.inCurrentMonth ? 'active' : ''}">
							<h5 class="eyebrow-heading-2">
								<b class={day.inCurrentMonth ? 'nameDay' : ''}>{day.dayNumber}</b>
							</h5>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</main>

<style>
	.pink {
		color: hsl(var(--color-primary-100));
	}
	.pink-body {
		background-color: hsl(var(--color-primary-300));
	}
	.active {
		background-color: hsl(var(--color-neutral-200));
	}
	.active:hover {
		background-color: hsl(var(--color-neutral-150));
	}
	.nameDay {
		color: hsl(var(--color-primary-300));
	}
</style>
