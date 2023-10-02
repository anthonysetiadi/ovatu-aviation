<template>
	<header class="flex-center flex-row mt-4">
		<img
			width="80"
			height="80"
			src="https://img.icons8.com/nolan/96/airplane-take-off.png"
			alt="airplane-take-off"
		/>
		<h1 class="head-text gradient">Ovatu Aviation</h1>
	</header>
	<main>
		<section class="flex justify-center mt-8">
			<DropdownMenu @itemSelected="fetchSchedule" />
		</section>
	</main>
</template>

<script setup>
import DropdownMenu from './components/DropdownMenu.vue';

const fetchSchedule = async (selectedItem) => {
	try {
		const departures = await fetch(
			`https://airlabs.co/api/v9/schedules?dep_iata=${selectedItem.iata}&api_key=f410e654-34a3-48da-b5ae-b7a1ee186b2b`
		);
		const departuresData = await departures.json();

		const arrivals = await fetch(
			`https://airlabs.co/api/v9/schedules?arr_iata=${selectedItem.iata}&api_key=f410e654-34a3-48da-b5ae-b7a1ee186b2b`
		);
		const arrivalsData = await arrivals.json();

		console.log(departuresData);
		console.log(arrivalsData);
	} catch (error) {
		console.log('Error fetching data:', error);
	}
};

// const fetchSchedule = (selectedItem) => {
// 	console.log('Selected Item:', selectedItem);
// };
</script>
