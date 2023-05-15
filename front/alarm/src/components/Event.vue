<script>
import axios from 'axios'
export default {
	data() {
		return {
			itemsPerPage: 5,
			headers: ['Time', 'User', 'Event'],
			eventdate: null,
			dialog: false,
			notifications: false,
			sound: true,
			widgets: false,
			currentDate: new Date(),
			visible_month: new Date(),
			selectedDate: null,
			daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			weeksOfMonth: [],
			eventDays: ['3.4.2023'],  // '03.03.2023',
			events: [],
			selectedEvents: [
				{
					username: '-',
					event: '-',
					time: '-'
				}
			]
		}
	},
	computed: {
		currentMonth() {
			return this.visible_month.toLocaleString('default', { month: 'long', year: 'numeric' })
		}
	},
	created() {
		const year = this.visible_month.getFullYear()
		const month = this.visible_month.getMonth()
		this.weeksOfMonth = this.getWeeksOfMonth(year, month)
	},
	methods: {

		getEventDays: function (date) {
			this.eventDays = []
			console.log(this.eventDays)
			console.log(date.getTime())
			axios.post('/get_event_month', {
				access_key: localStorage.getItem('access_key'),
				year: date.getFullYear(),
				month: date.getMonth()
			})
				.then((response) => {
					console.log(response)
					this.eventDays = response.data
				})
				.catch(function (error) {
					console.log(error)
				})
		},
		isIncludedDate(dateString) {
			// console.log(dateString)
			// console.log(this.eventDays.includes(dateString))
			return this.eventDays.includes(dateString)
		},
		previousMonth() {
			const year = this.visible_month.getFullYear()
			const month = this.visible_month.getMonth()
			this.visible_month = new Date(year, month - 1, 1)
			this.weeksOfMonth = this.getWeeksOfMonth(this.visible_month.getFullYear(), this.visible_month.getMonth())
			this.getEventDays(this.visible_month)
		},
		previousYear() {
			const year = this.visible_month.getFullYear()
			const month = this.visible_month.getMonth()
			this.visible_month = new Date(year - 1, month, 1)
			this.weeksOfMonth = this.getWeeksOfMonth(this.visible_month.getFullYear(), this.visible_month.getMonth())
			this.getEventDays(this.visible_month)
		},
		nextMonth() {
			const year = this.visible_month.getFullYear()
			const month = this.visible_month.getMonth()
			this.visible_month = new Date(year, month + 1, 1)
			this.weeksOfMonth = this.getWeeksOfMonth(this.visible_month.getFullYear(), this.visible_month.getMonth())
			this.getEventDays(this.visible_month)
		},
		nextYear() {
			const year = this.visible_month.getFullYear()
			const month = this.visible_month.getMonth()
			this.visible_month = new Date(year + 1, month, 1)
			this.weeksOfMonth = this.getWeeksOfMonth(this.visible_month.getFullYear(), this.visible_month.getMonth())
			this.getEventDays(this.visible_month)
		},
		getWeeksOfMonth(year, month) {
			const firstDayOfMonth = new Date(year, month, 1)
			// const lastDayOfMonth = new Date(year, month + 1, 0)
			const weeksOfMonth = []
			let week = []
			let day = new Date(firstDayOfMonth)

			// Add empty cells for days before the first day of the month
			for (let i = 1; i < (day.getDay() === 0 ? 7 : day.getDay()); i++) {
				week.push('')
			}
			// Add cells for each day of the month
			for (day of this.daysInMonth(year, month)) {
				week.push(new Date(day.getFullYear(), day.getMonth(), day.getDate()))
				// console.log(new Date(day.getFullYear(), day.getMonth(), day.getDate()))

				if (day.getDay() === 0) {
					// Add completed week to weeks array
					weeksOfMonth.push(week)
					// Reset week array for next week
					week = []
				}
			}

			// Add empty cells for days after the last day of the month
			for (let i = day.getDay(); i < 7 && day.getDay() !== 0; i++) {
				week.push('')
			}

			// Add completed week to weeks array
			weeksOfMonth.push(week)

			return weeksOfMonth
		},
		daysInMonth(year, month) {
			const firstDayOfMonth = new Date(year, month, 1)
			const lastDayOfMonth = new Date(year, month + 1, 0)
			const days = []

			for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
				days.push(new Date(year, month, i))
			}

			return days
		},
		isCurrentDate(date) {
			const year = this.currentDate.getFullYear()
			const month = this.currentDate.getMonth()
			const day = this.currentDate.getDate()
			return date.getTime() === new Date(year, month, day).getTime()
		},
		isSelectedDate(date) {
			if (!this.selectedDate) {
				return false
			}
			return date.getDate() === this.selectedDate
		},
		selectDate(date) {
			if (this.selectedDate && this.selectedDate === date.getDate()) {
				this.selectedDate = null
			} else {
				this.selectedDate = date.getDate()
				// console.log(`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}.json`)
			}
		},
		showEvent(date) {
			if (this.isIncludedDate(`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`)) {
				// alert(date.getDate() + '/\n    ' + date.getMonth() + '/\n        ' + date.getFullYear() + '.json')
				this.dialog = true
				this.eventdate = date
				this.getEventDay(date)
				// alert(`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}.json`)
				// console.log(`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}.json`)
			}
		},
		getEventDay: function (date) {
			this.selectedEvents = [
				{
					username: '-',
					event: '-',
					time: '-'
				}
			]
			axios.post('/get_event_day', {
				access_key: localStorage.getItem('access_key'),
				year: date.getFullYear(),
				month: date.getMonth(),
				day: date.getDate()
			})
				.then((response) => {
					console.log(response)
					this.selectedEvents = response.data
				})
				.catch(function (error) {
					console.log(error)
				})
		}
	}
}
</script>

<template>
	<div class="row">
		<div class="col-6 h-100 event">
			<h2>Календарь событий</h2>
			<div class="calendar w-100">
				<!-- <div class="mb-3 d-flex justify-content-between">
					<div class="col-md-6 text-center">
						<button class="btn btn-danger text-white" @click="prevYear">
							<svg style="height:24px;width:24px" viewBox="0 0 24 24">
								<path fill="currentColor"
									d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z">
								</path>
							</svg>
						</button>
						<button class="btn btn-danger text-white" @click="prevMonth">
							<svg style="height:24px;width:24px" viewBox="0 0 24 24">
								<path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
							</svg>
						</button>
					</div>
					<h4 class="text-center">{{ monthYear }}</h4>
					<div class="col-md-6 text-center">
						<button class="btn btn-danger text-white" @click="nextMonth">
							<svg style="height:24px;width:24px" viewBox="0 0 24 24">
								<path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
							</svg>
						</button>
						<button class="btn btn-danger text-white" @click="nextYear">
							<svg style="height:24px;width:24px" viewBox="0 0 24 24">
								<path fill="currentColor"
									d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z">
								</path>
							</svg>
						</button>
					</div>
				</div>
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Sun</th>
							<th>Mon</th>
							<th>Tue</th>
							<th>Wed</th>
							<th>Thu</th>
							<th>Fri</th>
							<th>Sat</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="week in weeks" :key="week">
							<td v-for="day in week" :key="day.date" :class="day.classes" @click="selectDate(day.date)">
								{{ day.number }}
							</td>
						</tr>
					</tbody>
				</table> -->

				<div>
					<div class="mb-3 d-flex justify-content-between align-items-center">
						<div class="col-md-6 text-center">
							<button class="btn btn-danger text-white" @click="previousYear">
								<svg style="height:24px;width:24px" viewBox="0 0 24 24">
									<path fill="currentColor"
										d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z">
									</path>
								</svg>
							</button>
							<button class="btn btn-danger text-white" @click="previousMonth">
								<svg style="height:24px;width:24px" viewBox="0 0 24 24">
									<path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
								</svg>
							</button>
						</div>
						<h5 class="text-center">{{ currentMonth }}</h5>
						<div class="col-md-6 text-center">
							<button class="btn btn-danger text-white" @click="nextMonth">
								<svg style="height:24px;width:24px" viewBox="0 0 24 24">
									<path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
								</svg>
							</button>
							<button class="btn btn-danger text-white" @click="nextYear">
								<svg style="height:24px;width:24px" viewBox="0 0 24 24">
									<path fill="currentColor"
										d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z">
									</path>
								</svg>
							</button>
						</div>
					</div>
					<table class="table table-bordered">
						<thead class="">
							<tr>
								<th class="text-center bg-error" v-for="day in daysOfWeek" :key="day">{{ day }}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="week in weeksOfMonth" :key="week">
								<td v-for="day in week" :key="day" class="we-td text-center">
									<div class="d-flex justify-content-center align-items-center">
										<button class="btn-size d-flex justify-content-center align-items-center" :class="{
											'btn btn-success': isCurrentDate(new Date(day)),
											'btn btn-link': day === '',
											'btn btn-danger': isIncludedDate(`${new Date(day).getDate()}.${new Date(day).getMonth()}.${new Date(day).getFullYear()}`),
											'btn btn-warning': isSelectedDate(new Date(day)),
											'btn btn-light': (!isSelectedDate(new Date(day)) &&
												!isCurrentDate(new Date(day)) &&
												!isIncludedDate(`${new Date(day).getDate()}.${new Date(day).getMonth()}.${new Date(day).getFullYear()}`))
										}" :disabled="day === ''" @click="selectDate(new Date(day)), showEvent(new Date(day))">
											<div v-if="day !== ''">{{ new Date(day).getDate() }}</div>
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

		</div>
		<div class="col-6 h-100 event">
			<h2>Список событий</h2>
			<div style="max-height: 350px; overflow-y: scroll;">
				<table class="table table-striped h-100">
					<thead class="sticky-top bg-timely text-white">
						<tr>
							<th>Пользователь</th>
							<th>Событие</th>
							<th>Время</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="event in selectedEvents" :key="event.id">
							<td>{{ event.username }}</td>
							<td>{{ event.event }}</td>
							<td>{{ event.time }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

	</div>
</template>
  
<style scoped>

.we-td {
	padding: 0;
}
.btn-size {
	height: 100%;
	width: 100%;
	/* height: 30px;
	width: 30px; */
}

.event {
	width: 100%;
}

@media (min-width: 1024px) {
	.event {
		width: 50%;
	}

}

.current-date {
	border-radius: 1rem;
	border: 5px solid rgb(76, 175, 80);
}

.bg-grey {
	border-radius: 1rem;
	border: 5px;
}

.bg-danger {
	border-radius: 1rem;
	border: 5px;
}

.bg-warning {
	border-radius: 1rem;
	border: 5px;
}
</style>
