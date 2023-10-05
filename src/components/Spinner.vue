<template>
	<div class="fixed inset-0 flex flex-col justify-center items-center bg-white bg-opacity-50">
		<div class="loader">
			<div class="segment"></div>
		</div>
		<h1 class="py-4 leading-relaxed text-center text-xl">{{ props.message }}</h1>
	</div>
</template>

<script setup>
const props = defineProps(['message']);
</script>

<style scoped>
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.loader {
	position: relative;
	border: 10px solid rgba(0, 0, 0, 0.1);
	border-radius: 50%;
	width: 120px;
	height: 120px;
}

.segment {
	content: '';
	position: absolute;
	top: -10px;
	left: -10px;
	border: 10px solid transparent;
	border-top-color: #e879f9;
	border-radius: 50%;
	width: calc(100% + 20px);
	height: calc(100% + 20px);
	animation: spin 1s linear infinite;
}
</style>
