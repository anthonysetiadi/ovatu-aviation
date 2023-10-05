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
import { items } from '../airports.js';
const emit = defineEmits(['itemSelected']);

const selected = ref(null);
const isOpen = ref(false);

function toggleDropdown() {
	isOpen.value = !isOpen.value;
}

function selectItem(item) {
	selected.value = item;
	emit('itemSelected', item);
	isOpen.value = false;
}
</script>
