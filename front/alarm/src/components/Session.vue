<script>
import axios from 'axios'

export default {
	data() {
		return {
			sessions: [
				{
					id: 'goose',
					username: 'goose',
					key: 'goose'
				},
				{
					id: 'user',
					username: 'user',
					key: 'user'
				}
			]
		}
	},
	methods: {
		get_sessions() {
			axios.get('/get_sessions')
				.then((response) => {
					console.log(response.data)
					if (response.data == null) {
						this.sessions = []
					} else {
						this.sessions = response.data
					}
				})
				.catch(function (error) {
					console.log(error)
				})
		},
		disable(id) {
			axios.post('/disable', {
				access_key: localStorage.getItem('access_key'),
				user: this.sessions.find(u => u.id === id)
			})
				.then((response) => {
					console.log(response)
					this.sessions = this.sessions.filter(t => t.id !== id)
				})
				.catch(function (error) {
					console.log(error)
				})
		}
	},
	mounted() {
		this.get_sessions()
	}
}
</script>

<template>
	<div class="row">
		<h2>Список активных пользователей</h2>
		<div class="col h-100">
			<table class="table table-striped w-100">
				<thead class="bg-timely text-white">
					<tr>
						<th class="text-left">
							id
						</th>
						<th class="text-left">
							Username
						</th>
						<th class="text-left">
							Key
						</th>
						<th class="text-left">
							Disable
						</th>
					</tr>
				</thead>
				<tbody v-if="sessions.length !== 0">
					<tr v-for="session in sessions" :key="session">
						<td>{{ session.id }}</td>
						<td>{{ session.username }}</td>
						<td>{{ session.key }}</td>
						<td >
							<button class="btn btn-danger text-white" @click="disable(session.id)">
								<svg viewBox="0 0 24 24" style="height: 25px; width: 25px;">
									<path fill="currentColor" d="M12,4A4,4 0 0,1 16,8C16,9.95 14.6,11.58 12.75,11.93L8.07,7.25C8.42,5.4 10.05,4 12,4M12.28,14L18.28,20L20,21.72L18.73,23L15.73,20H4V18C4,16.16 6.5,14.61 9.87,14.14L2.78,7.05L4.05,5.78L12.28,14M20,18V19.18L15.14,14.32C18,14.93 20,16.35 20,18Z">
									</path>
								</svg>
							</button>
						</td>
					</tr>
				</tbody>
				<tbody v-else>
					<tr>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
					</tr>
				</tbody>
			</table>

		</div>
	</div>
</template>

<style scoped>

</style>
