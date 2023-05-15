<script>
import Session from '../components/Session.vue'
import Event from '../components/Event.vue'
import { computed, ref } from 'vue';

export default {
	components: {
		Session,
		Event
	}
};
</script>

<template>
  <div class=" h-100 w-100">
    <Session />
	<hr class="my-4">
	<Event />
  </div>
</template>
  
<style scoped>

</style>
  