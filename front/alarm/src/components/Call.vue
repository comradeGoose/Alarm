<script>
import axios from 'axios'
export default {
  props: {
    call: {
      type: Object,
      required: true
    },
    index: Number
  },
  data () {
    return {
      musicList: ['1', '2', '3', '4', 'Radiohead - Creep'],
      music: this.call.music,
      startLesson: this.call.startLesson,
      endLesson: this.call.endLesson,
      daysOfTheWeek: this.call.daysOfTheWeek,
      play: this.call.play
    }
  },
  mounted () {
    axios.get('/music_list')
      .then((response) => {
        console.log(response.data)
        this.music_list = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    get_music_list: function () {
      axios.get('/music_list')
        .then((response) => {
          console.log(response)
          console.log(response.data)
          this.music_list = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    log_checkedNames () {
      console.log(this.checkedNames)
    }
  }
}
</script>

<template>
  <div class="col">
    <div class="card h-100 w-100 shadow border-danger" style="width: auto;">  <!-- bg-card text-color -->
      <!-- <img src="..." class="card-img-top" alt="..."> -->
      <div class="card-body">
        <!-- <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.
					This content is a little bit longer.</p> -->
        <label for="time-input">Audio notification ringtone:</label>
        <select class="form-select valid text-white" v-model="music" required aria-label="Open this ringtone selection menu">
            <option v-for="music of musicList" :key="music">{{ music }}</option>
          </select>
        <br />
        <div class="form-group">
          <label for="time-input">Audio notification time:</label>
          <div class="input-group">
            <input type="time" required id="start-time-input" class="form-control valid text-white" v-model="startLesson" > 
            <div class="d-flex align-items-center">
              <svg viewBox="0 0 24 24" style="height: 30px; width: 30px;">
                <path fill="currentColor"
                  d="M23,12L19,16V13H6.83C6.42,14.17 5.31,15 4,15A3,3 0 0,1 1,12A3,3 0 0,1 4,9C5.31,9 6.42,9.83 6.83,11H19V8L23,12Z">
                </path>
              </svg>
            </div>
            <input type="time" required id="end-time-input" class="form-control valid text-white" v-model="endLesson">
          </div>
        </div>

        <br />

        <div class="d-flex justify-content-between">
          <label>
            <div>
              <div class="checkbox-wrapper-13">
                <input type="checkbox" id="Monday" value="1" v-model="daysOfTheWeek">
              </div>
            </div>
            Mo
          </label>

          <label>
            <div>
              <div class="checkbox-wrapper-13">
                <input type="checkbox" id="Tuesday" value="2" v-model="daysOfTheWeek">
              </div>
            </div>
            Tu
          </label>

          <label>
            <div>
              <div class="checkbox-wrapper-13">
                <input type="checkbox" id="Wednesday" value="3" v-model="daysOfTheWeek">
              </div>
            </div>
            We
          </label>

          <label>
            <div>
              <div class="checkbox-wrapper-13">
                <input type="checkbox" id="Thursday" value="4" v-model="daysOfTheWeek">
              </div>
            </div>
            Th
          </label>

          <label>
            <div>
              <div class="checkbox-wrapper-13">
                <input type="checkbox" id="Friday" value="5" v-model="daysOfTheWeek">
              </div>
            </div>
            Fr
          </label>

          <label>
            <div>
              <div class="checkbox-wrapper-13">
                <input type="checkbox" id="Saturday" value="6" v-model="daysOfTheWeek">
              </div>
            </div>
            Sa
          </label>
        </div>

      </div>
      
      <div class="card-footer border-danger">
        <div class="d-flex justify-content-between align-items-center text-timely">
          <button type="button" class="btn text-timely">
            <!-- <svg viewBox="0 0 24 24" style="height: 30px; width: 30px;">
              <path fill="currentColor"
                d="M20.12 14.46L18 16.59L15.88 14.46L14.46 15.88L16.59 18L14.46 20.12L15.88 21.54L18 19.41L20.12 21.54L21.54 20.12L19.41 18L21.54 15.88M12 2C10.9 2 10 2.9 10 4C10 4.1 10 4.19 10 4.29C7.12 5.14 5 7.82 5 11V17L3 19V20H12.35C12.12 19.36 12 18.68 12 18H7V11A5 5 0 0 1 12 6A5 5 0 0 1 17 11V12.09C17.33 12.04 17.66 12 18 12C18.34 12 18.67 12.03 19 12.09V11C19 7.82 16.88 5.14 14 4.29C14 4.19 14 4.1 14 4C14 2.9 13.11 2 12 2M10 21C10 22.11 10.9 23 12 23C12.66 23 13.28 22.67 13.65 22.13C13.33 21.79 13.05 21.41 12.81 21Z">
              </path>
            </svg> -->
            <svg viewBox="0 0 24 24" style="height: 30px; width: 30px;">
              <path fill="currentColor" d="M20.12 14.46L18 16.59L15.88 14.46L14.46 15.88L16.59 18L14.46 20.12L15.88 21.54L18 19.41L20.12 21.54L21.54 20.12L19.41 18L21.54 15.88M12 2C10.9 2 10 2.9 10 4C10 4.1 10 4.19 10 4.29C7.12 5.14 5 7.82 5 11V17L3 19V20H12.35C12.12 19.36 12 18.68 12 18C12 14.69 14.69 12 18 12C18.34 12 18.67 12.03 19 12.09V11C19 7.82 16.88 5.14 14 4.29C14 4.19 14 4.1 14 4C14 2.9 13.11 2 12 2M10 21C10 22.11 10.9 23 12 23C12.66 23 13.28 22.67 13.65 22.13C13.33 21.79 13.05 21.41 12.81 21Z"></path>
            </svg>
          </button>

          <!-- <small class="text-body-secondary">Last updated 3 mins ago</small> -->

          <label class="switch">
            <input v-model="play" type="checkbox">
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
