<script>
import axios from 'axios'
export default {
  name: 'SignIn',
  data () {
    return {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
			// remember: false
      // isLoading: false
    }
  },
  methods: {
		auth: function () {
			console.log(this.username, this.password, localStorage.getItem('access_key'))
			axios.post('/sign_in', {
        username: this.username,
        password: this.password,
        access_key: localStorage.getItem('access_key')
      })
        .then((response) => {
          console.log(response)
          console.log(response.data)
					localStorage.setItem('username', this.username)
					localStorage.setItem('password', this.password)
          localStorage.setItem('access_key',response.data.access_key)
          localStorage.setItem('admin',response.data.admin)
          window.location.reload()
        })
        .catch(function (error) {
          console.log(error)
          localStorage.clear()
          window.location.reload()
        })
		}
  }
}
</script>

<template>
	<div class="text-center">
		<div class="form-signin w-100 m-auto">
	<form>
		<img class="mb-4" src="../assets/logo.svg" alt="" width="72" height="72">
		<h1 class="h3 mb-3 fw-normal">Авторизуйтесь</h1>

		<div class="form-floating">
			<input type="text" class="form-control" id="floatingInput" placeholder="Username" v-model="username">
			<label for="floatingInput">Имя пользователя</label>
		</div>
		<div class="form-floating">
			<input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
			<label for="floatingPassword">Пароль</label>
		</div>

		<div class="checkbox mb-3">
			<label>
				<input type="checkbox" value="remember-me"> Remember me
			</label>
		</div>
	</form>
  <button class="w-100 btn btn-lg btn-timely" @click="auth()">Авторизоваться</button>
	<p class="mt-5 mb-3 text-body-secondary">&copy; 2022-2023</p>
</div>
</div>
</template>

<style scoped>

.bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

      .b-example-divider {
        width: 100%;
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }

      .btn-bd-primary {
        --bd-violet-bg: #712cf9;
        --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

        --bs-btn-font-weight: 600;
        --bs-btn-color: var(--bs-white);
        --bs-btn-bg: var(--bd-violet-bg);
        --bs-btn-border-color: var(--bd-violet-bg);
        --bs-btn-hover-color: var(--bs-white);
        --bs-btn-hover-bg: #6528e0;
        --bs-btn-hover-border-color: #6528e0;
        --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
        --bs-btn-active-color: var(--bs-btn-hover-color);
        --bs-btn-active-bg: #5a23c8;
        --bs-btn-active-border-color: #5a23c8;
      }
      .bd-mode-toggle {
        z-index: 1500;
      }

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
