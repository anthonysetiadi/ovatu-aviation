<template>
	<div class="max-width padding-x">
		<Header />
		<h1 class="mt-12 mb-4 head-text">Australian Airport Timetables ✈️</h1>
		<h3 class="mb-6">Today's departure and arrival schedules for your chosen airport.</h3>
		<DropdownMenu @itemSelected="fetchSchedule" />

		<main v-if="!isLoading" class="pb-8">
			<section class="flex flex-row md:justify-end pt-3">
				<Searchbar v-if="showSearch" v-model:searchQuery="searchQuery" />
			</section>
			<section class="flex flex-col items-center my-8 gap-y-8 xl:flex-row xl:gap-x-8">
				<Schedule
					v-if="showSchedule"
					title="departures"
					:data="departuresData"
					:searchQuery="searchQuery"
					@selectedFlight="fetchFlightInfo"
				/>
				<Schedule
					v-if="showSchedule"
					title="arrivals"
					:data="arrivalsData"
					:searchQuery="searchQuery"
					@selectedFlight="fetchFlightInfo"
				/>
			</section>
			<FlightInfo @closeModal="toggleModal" :showModal="showModal" :data="flightInfoData" />
		</main>
		<div v-if="isLoading">
			<Spinner message="Retrieving airport information..." />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import DropdownMenu from './components/DropdownMenu.vue';
import Schedule from './components/Schedule.vue';
import Searchbar from './components/Searchbar.vue';
import FlightInfo from './components/FlightInfo.vue';
import Header from './components/Header.vue';
import Spinner from './components/Spinner.vue';

const showSchedule = ref(false);
const showSearch = ref(false);
const searchQuery = ref('');
const showModal = ref(false);
const isLoading = ref(false);

const departuresData = ref([]);
const arrivalsData = ref([]);
const flightInfoData = ref({});

const toggleModal = () => {
	showModal.value = !showModal.value;
};

/* FETCH DATA */
const fetchFlightInfo = async (flight_iata) => {
	try {
		const flightInfo = await fetch(
			`https://airlabs.co/api/v9/flight?flight_iata=${flight_iata}&api_key=f410e654-34a3-48da-b5ae-b7a1ee186b2b`
		);
		const flightInfoJSON = await flightInfo.json();
		flightInfoData.value = flightInfoJSON.response;
		showModal.value = true;
	} catch (error) {
		console.log('Error fetching data:', error);
	}
};

const fetchSchedule = async (selectedItem) => {
	isLoading.value = true;
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
	} finally {
		isLoading.value = false;
	}
};
</script>
