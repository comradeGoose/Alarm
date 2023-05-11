<script>
import Call from './Call.vue';
import axios from 'axios'
export default {
	components: {
		Call
	},
	props: {
	},
	data() {
		return {
			calls: [
				{
					music: 'Radiohead - Creep',
					startLesson: '',
					endLesson: '10:30',
					daysOfTheWeek: [],
					play: true
				},
				{
					music: 'Radiohead - Creep',
					startLesson: '',
					endLesson: '10:30',
					daysOfTheWeek: [],
					play: true
				},
				{
					music: 'Radiohead - Creep',
					startLesson: '',
					endLesson: '10:30',
					daysOfTheWeek: [],
					play: true
				},
				{
					music: 'Radiohead - Creep',
					startLesson: '',
					endLesson: '10:30',
					daysOfTheWeek: [],
					play: true
				}
			]
		}
	},
	mounted() {
	},
	methods: {
	}
}
</script>

<template>
	<div
		:class="['row', 'row-cols-1', { 'row-cols-md-1': calls.length == 1, 'row-cols-md-2': calls.length == 2, 'row-cols-md-3': calls.length >= 3 }, 'g-4']">
		<Call v-for="(call, index) in calls" :key="index" :call="call" :index="index" />
	</div>
	<div class="container">
		<button class="bg-timely text-white fixed-button text-center">
			<svg viewBox="0 0 24 24" style="height: 35px; width: 35px;">
				<path fill="currentColor"
					d="M17 14V17H14V19H17V22H19V19H22V17H19V14M12 2A2 2 0 0 0 10 4A2 2 0 0 0 10 4.29C7.12 5.14 5 7.82 5 11V17L3 19V20H12.35A6 6 0 0 1 12 18A6 6 0 0 1 18 12A6 6 0 0 1 19 12.09V11C19 7.82 16.88 5.14 14 4.29A2 2 0 0 0 14 4A2 2 0 0 0 12 2M10 21A2 2 0 0 0 12 23A2 2 0 0 0 13.65 22.13A6 6 0 0 1 12.81 21Z">
				</path>
			</svg>
		</button>
	</div>
</template>

<style scoped>
.fixed-button {
	position: fixed;
	height: 65px;
	width: 65px;
	border-radius: 50%;
	border: 0;
	bottom: 20px;
	right: 20px;
}

.fixed-button:hover {
	background-color: rgb(150, 0, 0);
}

@media (min-width: 1024px) {
	.fixed-button {
		height: 90px;
		width: 90px;
	}
}
</style>