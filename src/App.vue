<template>
	<header class="flex-center flex-row mt-4">
		<img
			width="80"
			height="80"
			src="https://img.icons8.com/nolan/96/airplane-take-off.png"
			alt="airplane-take-off"
		/>
		<h1 class="font-heading head-text gradient">Ovatu Aviation</h1>
	</header>
	<main>
		<section class="flex-center flex-col grow mt-8">
			<h2 class="mb-4 text-xl">
				Find today's flight schedules for the following Australian airports:
			</h2>
			<DropdownMenu @itemSelected="fetchSchedule" />
		</section>
		<section class="flex flex-col items-center m-8 gap-y-8 lg:flex-row lg:gap-x-8">
			<Schedule v-if="showSchedule" title="departures" :data="departuresData" />
			<Schedule v-if="showSchedule" title="arrivals" :data="arrivalsData" />
		</section>
	</main>
</template>

<script setup>
import { ref } from 'vue';
import DropdownMenu from './components/DropdownMenu.vue';
import Schedule from './components/Schedule.vue';

const showSchedule = ref(false);

const departuresData = ref([]);
const arrivalsData = ref([]);

const fetchSchedule = async (selectedItem) => {
	try {
		const departures = await fetch(
			`https://airlabs.co/api/v9/schedules?dep_iata=${selectedItem.iata}&api_key=f410e654-34a3-48da-b5ae-b7a1ee186b2b`
		);
		const departuresJSON = await departures.json();

		departuresData.value = departuresJSON.response.flatMap((item) => item);

		const arrivals = await fetch(
			`https://airlabs.co/api/v9/schedules?arr_iata=${selectedItem.iata}&api_key=f410e654-34a3-48da-b5ae-b7a1ee186b2b`
		);
		const arrivalsJSON = await arrivals.json();

		arrivalsData.value = arrivalsJSON.response.flatMap((item) => item);

		showSchedule.value = true;
	} catch (error) {
		console.log('Error fetching data:', error);
	}
};
</script>
