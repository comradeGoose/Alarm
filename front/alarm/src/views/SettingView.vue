<script>
import axios from 'axios'
export default {
	data() {
		return {
			volume: 30,
			file: '',
			filename: '',
			filesize: 0,
			filetype: '',
			active: false
		}
	},
	watch: {
		// whenever question changes, this function will run
		volume(newVolume, oldVolume) {
			if (newVolume !== oldVolume) {
				this.post_volume_music()
			}
		}
	},
	mounted() {
		axios.get('/get_volume')
			.then((response) => {
				console.log(response.data)
				this.volume = response.data.volume
			})
			.catch(function (error) {
				console.log(error)
			})
	},
	methods: {
		post_erase_wifi: function () {
			axios.post('/erase_wifi', {
				access_key: localStorage.getItem('access_key')
			})
				.then((response) => {
					console.log(response)
					window.location.replace('/')
				})
				.catch(function (error) {
					console.log(error)
					localStorage.removeItem('access_key')
					window.location.replace('/')
				})	
		},
		post_volume_music: function () {
			axios.post('/set_volume', {
				volume: this.volume,
				access_key: localStorage.getItem('access_key')
			})
				.then((response) => {
					console.log(response)
				})
				.catch(function (error) {
					console.log(error)
					localStorage.removeItem('access_key')
					window.location.replace('/')
				})
		},
		submitFile() {
			if (this.file === '') {
				console.log('file is null')
				alert('FILE IS MISSING')
			} else if (this.filesize >= 31457280) {
				alert('MAX SIZE 30M')
				this.file = ''
				this.filename = ''
				this.filesize = 0
				this.filetype = ''
				document.querySelector('input[type=file]').value = ''
			} else if (this.filetype !== 'audio/mpeg') {
				alert('ONLY AUDIO FILES')
				this.file = ''
				this.filename = ''
				this.filesize = 0
				this.filetype = ''
				document.querySelector('input[type=file]').value = ''
			} else if ((this.filename.indexOf('.mp3') < 1)) {
				alert('ONLY .MP3 FILES')
				this.file = ''
				this.filename = ''
				this.filesize = 0
				this.filetype = ''
				document.querySelector('input[type=file]').value = ''
			} else {
				const formData = new FormData()
				formData.append('file', this.file)
				this.active = true
				axios.post('/upload_file/', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					params: {
						filename: this.filename
					}
				})
					.then((response) => {
						console.log(response)
						this.active = false
					})
					.catch(function (error) {
						console.log(error)
					})
				this.file = ''
				this.filename = ''
				this.filesize = 0
				this.filetype = ''
				document.querySelector('input[type=file]').value = ''
			}
		},
		handleFileUpload() {
			this.file = this.$refs.file.files[0]
			this.filename = this.$refs.file.files[0].name
			this.filesize = this.$refs.file.files[0].size
			this.filetype = this.$refs.file.files[0].type
			console.log(this.file)
			console.log(this.filename)
			console.log(this.filesize)
			console.log(this.filetype)
		}
	}
}
</script>

<template>
	<div class="row row-cols-1 row-cols-md-1 g-4">
		<div class="card">
			<h3 class="card-header text-timely">Set volume</h3>
			<div class="card-body text-center">
				<label for="customRange3" class="form-label">{{ volume }}</label>
				<input type="range" class="form-range" min="0" max="100" step="10" id="customRange3" v-model="volume">
			</div>
		</div>

		<div class="card">
			<h3 class="card-header text-timely">Upload file</h3>
			<div class="card-body">
				<div class="input-group">
					<input type="file" ref="file" class="form-control" id="file" aria-describedby="inputGroupFileAddon04"
						aria-label="Upload" v-on:change="handleFileUpload()">
					<button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04"
						v-on:click="submitFile()">Upload</button> <!-- :disabled="active"-->
				</div>
			</div>
		</div>

		<div class="card">
			<h3 class="card-header text-timely">Erase Wi-Fi</h3>
			<div class="card-body text-center">
					<button class="btn btn-timely" type="button" id="inputGroupFileAddon04"
						@click="post_erase_wifi">Erase</button>
			</div>
		</div>
	</div>
</template>