<template>
	<div class="searchbar">
		<i class="fa-solid fa-magnifying-glass absolute px-2"></i>
		<input
			v-model="searchQuery"
			class="px-8 py-2 bg-white rounded"
			type="text"
			placeholder="Search for a flight..."
		/>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['searchQuery']);
const emit = defineEmits(['update:searchQuery']);

const searchQuery = computed({
	get() {
		return props.searchQuery;
	},
	set(searchQuery) {
		emit('update:searchQuery', searchQuery);
	},
});
</script>
