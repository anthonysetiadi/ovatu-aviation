<template>
	<div class="app">
		<header>
			<nav class="flex flex-row justify-between mt-8">
				<div class="flex flex-row items-center">
					<img
						width="40"
						height="40"
						src="https://img.icons8.com/nolan/96/airplane-take-off.png"
						alt="airplane-take-off"
					/>
					<h1 class="font-heading text-xl gradient">Ovatu Aviation</h1>
				</div>
				<Searchbar v-if="showSearch" v-model:searchQuery="searchQuery" />
			</nav>
			<h1 class="mt-12 mb-4 head-text">Australian Airport Timetables ✈️</h1>
			<h3 class="mb-6">Today's departure and arrival schedules for your chosen airport.</h3>
			<DropdownMenu @itemSelected="fetchSchedule" />
		</header>
		<main>
			<section class="flex-center flex-col grow mt-8"></section>
			<section class="flex flex-col items-center my-8 gap-y-8 lg:flex-row lg:gap-x-8">
				<Schedule
					v-if="showSchedule"
					title="departures"
					:data="departuresData"
					:searchQuery="searchQuery"
				/>
				<Schedule
					v-if="showSchedule"
					title="arrivals"
					:data="arrivalsData"
					:searchQuery="searchQuery"
				/>
			</section>
		</main>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import DropdownMenu from './components/DropdownMenu.vue';
import Schedule from './components/Schedule.vue';
import Searchbar from './components/Searchbar.vue';

const showSchedule = ref(false);
const showSearch = ref(false);
const searchQuery = ref('');

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
		showSearch.value = true;
	} catch (error) {
		console.log('Error fetching data:', error);
	}
};
</script>
