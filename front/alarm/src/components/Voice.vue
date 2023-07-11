<script>
import axios from 'axios'
export default {
	props: {
		voiceObj: {
			type: Object,
			required: true
		},
		index: Number
	},
	data() {
		return {
			id: this.voiceObj.id,
			type: this.voiceObj.type,
			description: this.voiceObj.description,
			voice: this.voiceObj.voice,
			date: this.voiceObj.date,
			time: this.voiceObj.time,
			play: this.voiceObj.play,
      recording: false,
      mediaStream: null,
      mediaRecorder: null,
      chunks: [],
      audioBlob: null,
			fileName: ''
		}
	},
	methods: {
		async startRecording() {
      try {
				this.chunks = []
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(this.mediaStream);

        this.mediaRecorder.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0) {
            this.chunks.push(event.data);
          }
        });

        this.mediaRecorder.addEventListener("stop", () => {
          this.audioBlob = new Blob(this.chunks, { type: "audio/mpeg" });
          const audioUrl = URL.createObjectURL(this.audioBlob);
          this.$refs.audioPlayer.src = audioUrl;
        });

        this.mediaRecorder.start();
        this.recording = true;
      } catch (error) {
        console.error("Ошибка доступа к микрофону:", error);
      }
    },
    stopRecording() {
      this.mediaRecorder.stop();
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.recording = false;
    },
		dateTimeToSeconds(dateStr, timeStr) {
			// Разбиваем строку даты на отдельные части (год, месяц, день)
			const dateParts = dateStr.split('-');
			const year = parseInt(dateParts[0]);
			const month = parseInt(dateParts[1]) - 1; // Месяцы в объекте Date нумеруются с 0
			const day = parseInt(dateParts[2]);

			// Разбиваем строку времени на отдельные части (часы, минуты)
			const timeParts = timeStr.split(':');
			const hours = parseInt(timeParts[0]);
			const minutes = parseInt(timeParts[1]);

			// Создаем новый объект Date с указанной датой и временем
			const dateTime = new Date(year, month, day, hours, minutes);

			// Преобразуем дату и время в секунды
			// const seconds = Math.floor(dateTime.getTime() / 1000);

			// Возвращаем результат
			// this.fileName = dateTime.getTime();
			console.log(dateTime.getTime().toString())
			return dateTime.getTime().toString()
		},
		sendRecording() {
			const formData = new FormData();
			const name = this.dateTimeToSeconds(this.date, this.time)
			const filename = name + '.mp3'
			formData.append('audio', new Blob(this.chunks, { type: 'audio/mp3' }), filename);

			axios.post('/upload_file/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				params: {
					filename: filename
				}
			})
				.then(response => {
					console.log('Recording sent successfully:', response.data);
					// Reset recording data
					this.audioChunks = [];
					this.recorded = false;
					this.$emit('SetVoice', this.id, this.description, this.date, this.time, name)
				})
				.catch(error => {
					this.$emit('SetVoice', this.id, this.description, this.date, this.time, name);
					console.error('Error sending recording:', error);
				});
		}
	}
}
</script>

<template>
	<div class="col call">
		<div class="card h-100 w-100 shadow border-danger"> <!-- bg-card text-color -->
			<!-- <img src="..." class="card-img-top" alt="..."> -->
			<div class="card-body">
				<!-- <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.
					This content is a little bit longer.</p> -->
				<svg viewBox="0 0 24 24" style="height: 20px; width: 20px;">
					<path fill="currentColor"
						d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18">
					</path>
				</svg>
				<label for="time-input">Описание:</label>
				<input type="text" required id="end-time-input" class="form-control valid text-white" v-model="description"
					:disabled="play">
				<!-- <select class="form-select valid text-white" v-model="music" @click="get_music_list()"
					@change="$emit('update_music_name', call.id, music)" required aria-label="Open this ringtone selection menu">
					<option v-for="music of musicList" :key="music">{{ music }}</option>
				</select> -->
				<br />
				<div class="form-group">


					<div v-if="!play">
						<svg viewBox="0 0 24 24" style="height: 20px; width: 20px;">
							<path fill="currentColor"
								d="M9,5A4,4 0 0,1 13,9A4,4 0 0,1 9,13A4,4 0 0,1 5,9A4,4 0 0,1 9,5M9,15C11.67,15 17,16.34 17,19V21H1V19C1,16.34 6.33,15 9,15M16.76,5.36C18.78,7.56 18.78,10.61 16.76,12.63L15.08,10.94C15.92,9.76 15.92,8.23 15.08,7.05L16.76,5.36M20.07,2C24,6.05 23.97,12.11 20.07,16L18.44,14.37C21.21,11.19 21.21,6.65 18.44,3.63L20.07,2Z">
							</path>
						</svg>
						<label for="time-input">Голосовое уведомление:</label>
						<div class="d-flex justify-content-center align-items-center">
							<!-- <button @click="startRecording" :disabled="isRecording || !description" class="btn btn-primary btn-voice"></button> -->
							<!-- <button @click="stopRecording" :disabled="!isRecording" class="btn btn-danger btn-voice"></button> -->
							<button class="btn btn-primary btn-voice" @click="startRecording" :disabled="recording"></button>
    					<button class="btn btn-danger btn-voice" @click="stopRecording" :disabled="!recording"></button>
    					<!-- <button @click="uploadRecording" :disabled="!audioBlob">Отправить запись</button> -->
							<!-- <audio class="timely-audio" :src="recordedBlob" controls></audio> -->
							<audio class="timely-audio" ref="audioPlayer" controls></audio>
						</div>
					</div>

					<div class="form-group">
						<svg viewBox="0 0 24 24" style="height: 20px; width: 20px;">
							<path fill="currentColor"
								d="M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z">
							</path>
						</svg>
						<label for="time-input">День и время подачи аудио уведомления:</label>
						<div class="input-group">
							<input type="date" required id="end-time-input" class="form-control valid text-white" v-model="date"
								:disabled="play">
							<input type="time" required id="end-time-input" class="form-control valid text-white" v-model="time"
								:disabled="play">
						</div>
					</div>
				</div>
				{{ fileName }}
			</div>

			<div class="card-footer border-danger">
				<div class="d-flex justify-content-between align-items-center text-timely">
					<button type="button" class="btn text-timely" @click="$emit('deleteCall', voiceObj.id)">
						<svg viewBox="0 0 24 24" style="height: 30px; width: 30px;">
							<path fill="currentColor"
								d="M9,2A3,3 0 0,1 12,5V11A3,3 0 0,1 9,14A3,3 0 0,1 6,11V5A3,3 0 0,1 9,2M16,11C16,14.5 13.44,17.43 10,17.93V21H8V17.93C4.56,17.43 2,14.5 2,11H4A5,5 0 0,0 9,16A5,5 0 0,0 14,11H16M15,5H23V7H15V5Z">
							</path>
						</svg>
					</button>

					<!-- <small class="text-body-secondary">Last updated 3 mins ago</small> -->

					<label class="switch">
						<input v-model="play" type="checkbox" @change="sendRecording()" :disabled="play || description == '' || date == '' || time == '' || chunks.length == 0">
						<div class="slider"></div>
						<div class="slider-card">
							<div class="slider-card-face slider-card-front"></div>
							<div class="slider-card-face slider-card-back"></div>
						</div>
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.timely-audio {
	max-width: 275px;
}

.btn-voice {
	height: 30px;
	width: 30px;
	border-radius: 50%;
}

.call {
	max-width: 450px;
}

input:invalid {
	background-color: rgba(176, 0, 32, 0.3);
}

select:invalid {
	background-color: rgba(176, 0, 32, 0.3);
}

.valid {
	background-color: rgb(158, 217, 156);
}

/* switch */
.switch {
	--circle-dim: 1.4em;
	font-size: 17px;
	position: relative;
	display: inline-block;
	width: 3.5em;
	height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}

/* The slider */
.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(176, 0, 32, 0.3);
	transition: .4s;
	border-radius: 30px;
}

.slider-card {
	position: absolute;
	content: "";
	height: var(--circle-dim);
	width: var(--circle-dim);
	border-radius: 20px;
	left: 0.3em;
	bottom: 0.3em;
	transition: .4s;
	pointer-events: none;
}

.slider-card-face {
	position: absolute;
	inset: 0;
	backface-visibility: hidden;
	perspective: 1000px;
	border-radius: 50%;
	transition: .4s transform;
}

.slider-card-front {
	background-color: rgb(176, 0, 32);
}

.slider-card-back {
	background-color: #379237;
	transform: rotateY(180deg);
}

input:checked~.slider-card .slider-card-back {
	transform: rotateY(0);
}

input:checked~.slider-card .slider-card-front {
	transform: rotateY(-180deg);
}

input:checked~.slider-card {
	transform: translateX(1.5em);
}

input:checked~.slider {
	background-color: #9ed99c;
}


/* checkbox */
.week {
	display: flex;
	align-content: space-around;
	justify-content: space-evenly;
	flex-direction: row;
	align-items: center;
}

@supports (-webkit-appearance: none) or (-moz-appearance: none) {
	.checkbox-wrapper-13 input[type=checkbox] {
		--active: #9ed99c;
		--active-inner: #fff;
		--focus: 2px rgba(39, 94, 254, .3);
		--border: rgba(150, 0, 0, 0.1);
		--border-hover: #91c490;
		--background: rgba(176, 0, 32, 0.3);
		--disabled: #F6F8FF;
		--disabled-inner: #E1E6F9;
		-webkit-appearance: none;
		-moz-appearance: none;
		height: 21px;
		outline: none;
		display: inline-block;
		vertical-align: top;
		position: relative;
		margin: 0;
		cursor: pointer;
		border: 1px solid var(--bc, var(--border));
		background: var(--b, var(--background));
		transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
	}

	.checkbox-wrapper-13 input[type=checkbox]:after {
		content: "";
		display: block;
		left: 0;
		top: 0;
		position: absolute;
		transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
	}

	.checkbox-wrapper-13 input[type=checkbox]:checked {
		--b: var(--active);
		--bc: var(--active);
		--d-o: .3s;
		--d-t: .6s;
		--d-t-e: cubic-bezier(.2, .85, .32, 1.2);
	}

	.checkbox-wrapper-13 input[type=checkbox]:disabled {
		--b: var(--disabled);
		cursor: not-allowed;
		opacity: 0.9;
	}

	.checkbox-wrapper-13 input[type=checkbox]:disabled:checked {
		--b: var(--disabled-inner);
		--bc: var(--border);
	}

	.checkbox-wrapper-13 input[type=checkbox]:disabled+label {
		cursor: not-allowed;
	}

	.checkbox-wrapper-13 input[type=checkbox]:hover:not(:checked):not(:disabled) {
		--bc: var(--border-hover);
	}

	.checkbox-wrapper-13 input[type=checkbox]:focus {
		box-shadow: 0 0 0 var(--focus);
	}

	.checkbox-wrapper-13 input[type=checkbox]:not(.switch) {
		width: 21px;
	}

	.checkbox-wrapper-13 input[type=checkbox]:not(.switch):after {
		opacity: var(--o, 0);
	}

	.checkbox-wrapper-13 input[type=checkbox]:not(.switch):checked {
		--o: 1;
	}

	.checkbox-wrapper-13 input[type=checkbox]+label {
		display: inline-block;
		vertical-align: middle;
		cursor: pointer;
		margin-left: 4px;
	}

	.checkbox-wrapper-13 input[type=checkbox]:not(.switch) {
		border-radius: 7px;
	}

	.checkbox-wrapper-13 input[type=checkbox]:not(.switch):after {
		width: 5px;
		height: 9px;
		border: 2px solid var(--active-inner);
		border-top: 0;
		border-left: 0;
		left: 7px;
		top: 4px;
		transform: rotate(var(--r, 20deg));
	}

	.checkbox-wrapper-13 input[type=checkbox]:not(.switch):checked {
		--r: 43deg;
	}
}

.checkbox-wrapper-13 * {
	box-sizing: inherit;
}

.checkbox-wrapper-13 *:before,
.checkbox-wrapper-13 *:after {
	box-sizing: inherit;
}
</style>
