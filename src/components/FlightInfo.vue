<template>
	<div
        v-if="props.showModal"
		class="fixed inset-0 mx-auto flex items-center justify-center z-50 w-full p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full"
	>
		<div class="relative w-full max-w-2xl max-h-full">
			<div class="fixed inset-0 bg-gray-900 opacity-50 z-1"></div>
			<!-- Modal content -->
			<div class="relative bg-white rounded-lg shadow">
				<!-- Modal header -->
				<div class="pt-6 pb-4 px-6 space-y-1 border-b rounded-t">
					<h2 class="text-2xl font-semibold text-gray-900">
						Flight {{ props.data.flight_iata }}
					</h2>
					<h3>{{ props.data.airline_name }}</h3>
					<div class="text-sm flex flex-row justify-between items-baseline">
						<p>{{ props.data.dep_city}} → {{  props.data.arr_city }}</p>
						<p class="border-slate-400 bg-slate-400 w-fit border  text-white px-2 rounded-md">
							{{ props.data.status }}
						</p>
					</div>
					<button
                        @click="$emit('closeModal', false)"
						type="button"
						class="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
					>
						<svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
					</button>
				</div>
				<!-- Modal body -->
				<div class="text-sm md:text-base p-6 grid grid-cols-2 divide-x text-gray-600">
					<div class="text-left leading-relaxed">
						<h1 class="text-base md:text-lg">{{ props.data.dep_iata }}</h1>
						<h2>{{ props.data.dep_name }}</h2>
                        <p>Terminal: {{ props.data.dep_terminal }}</p>
						<p>Gate: {{ props.data.dep_gate }}</p>
						<p>Departure Time: {{ props.data.dep_time }}</p>
					</div>
					<p class="text-right leading-relaxed">
						<h1 class="text-base md:text-lg">{{ props.data.arr_iata }}</h1>
						<h2>{{ props.data.arr_name }}</h2>
                        <p>Terminal: {{ props.data.arr_terminal }}</p>
						<p>Gate: {{ props.data.arr_gate }}</p>
						<p>Arrival Time: {{ props.data.arr_time }}</p>
					</p>
				</div>
				<!-- Modal footer -->
				<div
					class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b"
				>
                    <p class="text-sm text-gray-500">For more information about this flight, please visit {{ props.data.airline_name }} official website</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(['data', 'showModal']);
</script>
