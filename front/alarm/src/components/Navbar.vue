<script>
import axios from 'axios'
export default {
	name: 'SignIn',
	data() {
		return {
			admin: localStorage.getItem('admin'),
			username: localStorage.getItem('username'),
			previous_password: null,
			new_password_1: null,
			new_password_2: null,
		}
	},
	methods: {
		edit_password: function () {
			if (!this.previous_password ||
				!this.new_password_1 ||
				!this.new_password_2) {
				return
			}

			if (
				this.previous_password.length >= 5 &&
				this.new_password_1.length >= 5 &&
				this.new_password_1.length >= 5 &&
				this.new_password_1 == this.new_password_2) {
				console.log(this.previous_password, this.new_password_1, this.new_password_2)
			} else {
				console.log('error')
			}

		},
		log_out: function () {
			axios.post('/log_out', {
				access_key: localStorage.getItem('access_key')
			})
				.then((response) => {
					console.log(response)
					localStorage.removeItem('access_key')
					window.location.reload()
				})
				.catch(function (error) {
					console.log(error)
					localStorage.removeItem('access_key')
					window.location.reload()
				})
		}
	}
}
</script>

<template>
	<nav class="my-nav fixed-top navbar bg-nav shadow">
		<!-- <RouterLink to="/"><img src="@/assets/logo.svg" alt="Logo" width="45" height="45"
				class="d-inline-block align-text-top">
		</RouterLink> -->

		<button class="btn text-timely" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
			aria-controls="offcanvasExample">
			<img src="@/assets/logo.svg" alt="" width="45" height="45">
		</button>

		<div class="offcanvas offcanvas-start nav-sidebars" tabindex="-1" id="offcanvasExample"
			aria-labelledby="offcanvasExampleLabel">
			<div class="offcanvas-header">
				<h5 class="offcanvas-title" id="offcanvasExampleLabel">
					<RouterLink to="/about">Timely</RouterLink>
				</h5>
				<div></div>
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div class="accordion accordion-flush" id="accordionFlushExample">
				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
							data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
							Редактировать профиль
						</button>
					</h2>
					<div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
						<div class="accordion-body">
							<form>
								<div class="form-floating mb-3">
									<input type="email" class="form-control" id="floatingInputDisabled" placeholder="name@example.com"
										disabled>
									<label for="floatingInputDisabled">{{ username }}</label>
								</div>
								<div class="mb-3">
									<label for="exampleInputPassword1" class="form-label">Старый пароль</label>
									<input type="password" class="form-control" id="exampleInputPassword1" v-model="previous_password">
								</div>
								<div class="mb-3">
									<label for="exampleInputPassword1" class="form-label">Новый пароль</label>
									<input type="password" class="form-control" id="exampleInputPassword1" v-model="new_password_1">
								</div>
								<div class="mb-3">
									<label for="exampleInputPassword1" class="form-label">Повторите новый пароль</label>
									<input type="password" class="form-control" id="exampleInputPassword1" v-model="new_password_2">
								</div>
								<div class="mb-3 form-check">
									<input type="checkbox" class="form-check-input" id="exampleCheck1">
									<label class="form-check-label" for="exampleCheck1">Check me out</label>
								</div>
							</form>
							<button class="btn btn-primary" @click="edit_password()">Подтвердить</button>
						</div>
					</div>
				</div>
			</div>

			<div class="offcanvas-body">
			</div>

			<hr>

			<div class="dropdown text-center p-1">
				<button type="button" class="w-100 btn btn-lg btn-timely btn btn-lg btn-timely" data-bs-dismiss="offcanvas"
					aria-label="Close" @click="log_out()">Выйти</button>
			</div>
			<br>
		</div>
		<ul class="nav">
			<li class="nav-item">
				<RouterLink v-if="admin" to="/admin">Журнал</RouterLink>
			</li>
			<li class="nav-item">
				<RouterLink to="/calls">Звонки</RouterLink>
			</li>
			<li class="nav-item">
				<RouterLink to="/setting">Настройки</RouterLink>
			</li>
			<!-- <li class="nav-item">
				<RouterLink to="/about">O</RouterLink>
			</li> -->
		</ul>
	</nav>
</template>

<style scoped>
.my-nav {
	height: 70px;
}

.bg-nav {
	background-color: var(--bg-color-nav);
}

nav {
	padding-left: 5px;
	padding-right: 5px;
}

nav a.router-link-exact-active {
	color: white;
	background-color: rgba(176, 0, 32);
	border-radius: 1rem;
}

/* nav a.router-link-exact-active:hover {
	background-color: transparent;
	background-color: rgba(176, 0, 32, 0.1);
	border-radius: 1rem;
} */

nav a {
	display: inline-block;
	display: flex;
	align-items: center;
	height: 45px;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}

.nav-sidebars {
	width: 280px;
}


@media (min-width: 1024px) {
	nav {
		font-size: 20px;
	}

	.nav-sidebars {
		width: 400px;
	}
}
</style>
