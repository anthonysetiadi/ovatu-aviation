<template>
	<div class="w-full min-w-480 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
		<h2 class="text-center py-3 bg-slate-200 tracking-wider uppercase leading-4 font-bold">
			{{ props.title }}
		</h2>
		<table class="w-full">
			<thead>
				<tr>
					<th>Date/Time</th>
					<th>Flight</th>
					<th>
						{{ props.title === 'departures' ? 'Destination' : 'Origin' }}
					</th>
					<th>Gate</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in paginatedData" :key="item.flight_iata" class="hover:bg-gray-50">
					<td>
						{{ props.title === 'departures' ? item.dep_time : item.arr_time }}
					</td>
					<td>{{ item.flight_iata }}</td>
					<td>
						{{ props.title === 'departures' ? item.arr_iata : item.dep_iata }}
					</td>
					<td>
						{{ props.title === 'departures' ? item.dep_gate : item.arr_gate }}
					</td>
					<td>{{ item.status }}</td>
				</tr>
			</tbody>
		</table>
		<div class="pagination-controls">
			<button @click="prevPage" v-show="currentPage !== 1">
				<i class="fa-solid fa-chevron-left"></i>
			</button>
			<span class="text-center grow">Page {{ currentPage }} of {{ totalPages }}</span>
			<button @click="nextPage" v-show="currentPage !== totalPages">
				<i class="fa-solid fa-chevron-right"></i>
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['title', 'data', 'searchQuery']);

/* Filter Data */
const filteredData = computed(() => {
	if (!props.searchQuery || !props.searchQuery.length) return props.data;

	return props.data.filter((item) => {
		return (
			item.flight_iata && item.flight_iata.toLowerCase().includes(props.searchQuery.toLowerCase())
		);
	});
});

/* Pagination Start */
const currentPage = ref(1);
const itemsPerPage = ref(10);

const paginatedData = computed(() => {
	if (!props.data || !props.data.length) return [];

	// let filteredResults = props.data;
	// if (props.searchQuery && props.searchQuery.length) {
	// 	filteredResults = props.data.filter((item) => {
	// 		return (
	// 			item.flight_iata && item.flight_iata.toLowerCase().includes(props.searchQuery.toLowerCase())
	// 		);
	// 	});
	// }

	const start = (currentPage.value - 1) * itemsPerPage.value;
	const end = start + itemsPerPage.value;
	return filteredData.value.slice(start, end);
});

const totalPages = computed(() => {
	return Math.ceil(filteredData.value.length / itemsPerPage.value);
});

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
};

const prevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
};
/* Pagination End */
</script>
