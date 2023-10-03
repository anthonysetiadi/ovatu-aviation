<template>
	<div class="w-full min-w-480 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
		<h2 class="text-center py-3 bg-slate-200 tracking-wider uppercase leading-4 font-bold">
			{{ title }}
		</h2>
		<table class="w-full">
			<thead>
				<tr>
					<th class="table-header">Time</th>
					<th class="table-header">Flight</th>
					<th class="table-header">{{ title === 'departures' ? 'Destination' : 'Origin' }}</th>
					<th class="table-header">Gate</th>
					<th class="table-header">Status</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in data" :key="item.flight_iata">
					<td class="table-data">
						{{ title === 'departures' ? item.dep_time : item.arr_time }}
					</td>
					<td class="table-data">{{ item.flight_iata }}</td>
					<td class="table-data">{{ title === 'departures' ? item.arr_iata : item.dep_iata }}</td>
					<td class="table-data">{{ title === 'departures' ? item.dep_gate : item.arr_gate }}</td>
					<td class="table-data">{{ item.status }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
const { title, data } = defineProps(['title', 'data']);
</script>
