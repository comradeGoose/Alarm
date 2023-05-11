<script setup>
</script>

<template>
	<nav class="my-nav fixed-top navbar bg-nav shadow">
		<!-- <RouterLink to="/"><img src="@/assets/logo.svg" alt="Logo" width="45" height="45"
				class="d-inline-block align-text-top">
		</RouterLink> -->
		
		<button class="btn text-timely" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
			<img src="@/assets/logo.svg" alt="" width="45" height="45">
		</button>

		<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
			<div class="offcanvas-header">
				<h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div class="offcanvas-body">
				<div>
					Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images,
					lists, etc.
				</div>
				<div class="dropdown mt-3">
					<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
						Dropdown button
					</button>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item" href="#">Action</a></li>
						<li><a class="dropdown-item" href="#">Another action</a></li>
						<li><a class="dropdown-item" href="#">Something else here</a></li>
					</ul>
				</div>
			</div>
		</div>
		<ul class="nav">
			<li class="nav-item">
				<RouterLink to="/calls">Call list</RouterLink>
			</li>
			<li class="nav-item">
				<RouterLink to="/setting">Setting</RouterLink>
			</li>
			<li class="nav-item">
				<RouterLink to="/about">About</RouterLink>
			</li>
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
	color: var(--color-text);
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


@media (min-width: 1024px) {
	nav {
		font-size: 20px;
	}
}
</style>
