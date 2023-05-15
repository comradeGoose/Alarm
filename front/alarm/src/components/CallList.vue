<script>
import Call from './Call.vue';
import axios from 'axios'
import Guid from './Guid.vue';
export default {
	components: {
		Call,
		Guid
	},
	props: {
	},
	data() {
		return {
			calls: [
			]
		}
	},
	mounted() {
		axios.get('/get_notifications')
			.then((response) => {
				console.log(response.data)
				if (response.data == null) {
					this.calls = []
				} else {
					this.calls = response.data
				}
			})
			.catch(function (error) {
				console.log(error)
			})
	},
	methods: {

		sendCall() {
			axios.post('/set_notifications', {
				calls: this.calls,
				access_key: localStorage.getItem('access_key')
			})
				.then((response) => {
					console.log(response)
				})
				.catch(function (error) {
					console.log(error)
					// localStorage.removeItem('access_key')
					// window.location.reload()
				})
		},

		addCall() {
			this.calls.push(
				{
					id: Date.now(),
					music: null,
					startLesson: null,
					endLesson: null,
					daysOfTheWeek: [],
					play: false
				}
			)
			this.sendCall()
		},

		deleteCall: function (id) {
			console.log(id)
			this.calls = this.calls.filter(t => t.id !== id)
			console.log(this.calls)
			this.sendCall()
		},

		SetPlay: function (id) {
			this.calls = this.calls.map(t => t.id === id ? { ...t, play: !t.play } : t)
			this.sendCall()
		},

		update_music_name: function (id, newValue) {
			this.calls = this.calls.map(t => t.id === id ? { ...t, music: newValue } : t)
			this.sendCall()
		},

		update_time_start: function (id, newValue) {
			this.calls = this.calls.map(t => t.id === id ? { ...t, startLesson: newValue } : t)
			this.sendCall()
		},

		update_time_end: function (id, newValue) {
			this.calls = this.calls.map(t => t.id === id ? { ...t, endLesson: newValue } : t)
			this.sendCall()
		},

		update_week_days: function (id, newValue) {
			this.calls = this.calls.map(t => t.id === id ? { ...t, daysOfTheWeek: newValue } : t)
			this.sendCall()
		}
	},
}
</script>

<template>
	<div
		:class="['row', 'row-cols-1', { 'row-cols-md-1': calls.length == 1, 'row-cols-md-2': calls.length == 2, 'row-cols-md-3': calls.length >= 3 }, 'g-4']">
		<Call v-for="call in calls" :key="call.id" :call="call" :index="call.id" v-on:deleteCall="deleteCall"
			v-on:SetPlay="SetPlay" v-on:update_music_name="update_music_name" v-on:update_time_start="update_time_start"
			v-on:update_time_end="update_time_end" v-on:update_week_days="update_week_days" />
	</div>
	<div class="container">
		<!-- guid -->
		<button type="button" class="bg-timely text-white text-center fixed-button-info" data-bs-toggle="modal"
			data-bs-target="#staticBackdrop">
			<svg viewBox="0 0 24 24" style="height: 24px; width: 24px;">
				<path fill="currentColor"
					d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z">
				</path>
			</svg>
		</button>

		<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
			aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header bg-timely text-white">
						<h1 class="modal-title fs-5" id="staticBackdropLabel">Описание</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<Guid />
					</div>
				</div>
			</div>
		</div>


		<button class="bg-timely text-white fixed-button text-center" @click="addCall">
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

.fixed-button-info {
	position: fixed;
	height: 40px;
	width: 40px;
	border-radius: 50%;
	border: 0;
	bottom: 100px;
	right: 20px;
}

.fixed-button:hover {
	background-color: rgb(150, 0, 0);
}

.fixed-button-info:hover {
	background-color: rgb(150, 0, 0);
}

@media (min-width: 1024px) {
	.fixed-button {
		height: 90px;
		width: 90px;
	}

	.fixed-button-info {
		height: 50px;
		width: 50px;
		bottom: 125px;
		right: 20px;
	}

}
</style>