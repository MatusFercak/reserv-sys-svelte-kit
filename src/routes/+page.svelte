<script lang="ts">
	import { daysConst, monthNames } from '../lib/constant';
	import { CalendarGenerator } from '$lib/calendarGenerator';
	import { AppwriteServices } from '$lib/appwrite';
	import { currentDay } from '$lib/stores';
	let month = new Date().getMonth();
	let year = new Date().getFullYear();
	let days: any = CalendarGenerator.getCalendar(year, month);
	let dayToShow: any;

	function nextMonth() {
		if (++month > 11) {
			month = 0;
			year++;
		}
	}
	function previousMonth(){
		if (--month < 0) {
			month = 11;
			year--;
		}
	}

	$: if (month > -1) { //preto nam nezobrazovalo Januar ;)
		days = CalendarGenerator.getCalendar(year, month);
	}
	$: if (dayToShow) {
		currentDay.set(dayToShow);
	}
</script>

<main class="main-content">
	<div class="top-cover u-padding-block-end-56 astro-DCNASTZX">
		<div class="container cover-padding-top-big-screen astro-DCNASTZX">
			<nav class="pink-pager u-flex u-main-space-between u-padding-block-12 astro-COHSB7B2">
				<button
					class="button is-text"
					on:click={() => {
						previousMonth();
					}}
					><span class="icon-cheveron-left astro-COHSB7B2" />
					<span class="text u-capitalize astro-COHSB7B2">Previous month</span></button
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
					<a
						on:click={() => {
							dayToShow = day;
						}}
						href="/{day.dayID}"
					>
						<div
							class="card {day.inCurrentMonth && day.past
								? 'active'
								: day.inCurrentMonth
								? 'past'
								: 'not-active '}"
						>
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
	.not-active {
		background-color: hsl(var(--color-neutral-500));
	}
	.active {
		background-color: hsl(var(--color-neutral-200));
	}
	.past {
		background-color: hsl(var(--color-neutral-300));
	}
	.active:hover {
		background-color: hsl(var(--color-neutral-150));
	}
	.nameDay {
		color: hsl(var(--color-primary-300));
	}
</style>
