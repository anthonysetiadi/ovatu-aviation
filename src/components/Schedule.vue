<template>
	<div
		class="w-full shadow overflow-x-auto border-b border-gray-200 text-sm md:text-base rounded-lg grid grid-cols-1"
	>
		<h2 class="text-center py-3 bg-slate-200 tracking-wider uppercase font-bold">
			{{ props.title }}
		</h2>
		<table class="w-full">
			<thead>
				<tr>
					<th>Date/Time</th>
					<th>Flight</th>
					<th>
						<!-- For mobile view -->
						<span class="sm:hidden">{{ props.title === 'departures' ? 'Dest' : 'Ori' }}</span>
						<!-- For larger than mobile view -->
						<span class="hidden sm:inline">{{
							props.title === 'departures' ? 'Destination' : 'Origin'
						}}</span>
					</th>
					<th>Gate</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="item in paginatedData"
					:key="item.flight_iata"
					class="cursor-pointer bg-white hover:bg-gray-50 text-xs md:text-base"
					@click="$emit('selectedFlight', item.flight_iata)"
				>
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
	return props.data.filter((item) => {
		// check for null flight_iata
		if (!item.flight_iata) return false;
		// if no search query, include item
		if (!props.searchQuery || !props.searchQuery.length) return true;
		// check if item's flight_iata includes the search query
		return item.flight_iata.toLowerCase().includes(props.searchQuery.toLowerCase());
	});
});

/* Show Paginated Data */
const currentPage = ref(1);
const itemsPerPage = ref(10);

const paginatedData = computed(() => {
	if (!props.data || !props.data.length) return [];

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
</script>
