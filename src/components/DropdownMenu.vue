<template>
	<div class="relative">
		<div @click="toggleDropdown" class="custom-btn">
			<button>{{ selected ? selected.text : 'Select an Airport' }}</button>
			<i class="fa-solid fa-chevron-down"></i>
		</div>
		<ul
			class="cursor-pointer w-48 absolute left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10"
			v-if="isOpen"
		>
			<li v-for="item in items" :key="item.id" class="py-2 px-4 hover:bg-fuchsia-400">
				<a @click="selectItem(item)">
					{{ item.text }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits();

const isOpen = ref(false);
const items = [
	{ id: 1, text: 'MEL - Melbourne', iata: 'MEL' },
	{ id: 2, text: 'SYD - Sydney', iata: 'SYD' },
	{ id: 3, text: 'BNE - Brisbane', iata: 'BNE' },
	{ id: 4, text: 'PER - Perth', iata: 'PER' },
	{ id: 5, text: 'ADL - Adelaide', iata: 'ADL' },
	{ id: 6, text: 'CBR - Canberra', iata: 'CBR' },
	{ id: 7, text: 'CNS - Cairns', iata: 'CNS' },
	{ id: 8, text: 'DRW - Darwin', iata: 'DRW' },
	{ id: 9, text: 'OOL - Gold Coast', iata: 'OOL' },
	{ id: 10, text: 'TSV - Townsville', iata: 'TSV' },
];

function toggleDropdown() {
	isOpen.value = !isOpen.value;
}

const selected = ref(null);

function selectItem(item) {
	selected.value = item;
	emit('itemSelected', item);
	isOpen.value = false;
}
</script>
