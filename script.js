'use strict';

// prettier-ignore

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//* user stories
//* as a user i want to book a music show
//* as a user i want to buy a ticked

//! user stories -> Features -> flowchart -> architecture -> development step
//# user stories is description of the application's functionality from the user's perspective. All user stories put together describe the application
//# feartures: make user stories work (what we need to make the user stories work such as using map or list to display st)
//# flowchart: put all feartures in to the flowchart in order to has an overview
//# architecture: how we will organize the code what (language, framwork or db) we will use

//# as a ... i want to ... so that ... (who what why)
//# feartures: sketch not cecessary to be too detail in first
//# flow chart: good to start with an event(use color for specific type as yellow for event, green for render) ->
//# architecture: sketching

//# class to create an workout
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

//# subclasses
class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calPace();
    this._setDescription();
  }

  //# calculate pace (min/km)
  calPace() {
    this.pace = this.duration / this.distance;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevGain) {
    super(coords, distance, duration);
    this.elevGain = elevGain;
    this.calSpeed();
    this._setDescription();
  }

  //# calculate speed
  calSpeed() {
    this.speed = this.distance / this.duration;
  }
}

// const run1 = new Running([111, 222], 100, 2, 99);
// const cycling1 = new Cycling([666, 999], 100, 1, 10);
fdsfdsfds;
//# class to create a map
class App {
  #map;
  #mapEvent;
  #listWorkout = [];
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    //# swap unit speed
    inputType.addEventListener('change', this._inputelevation);
  }

  //# input elevation
  _inputelevation() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  //# get current position on the map
  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert('where are you now');
      }
    );
  }

  //# load all map
  _loadMap(position) {
    console.log(position);
    const { latitude, longitude } = position.coords;
    const coord = [latitude, longitude];

    console.log(latitude, longitude);
    console.log(
      `https://www.google.com/maps/@${latitude},${longitude},17z?entry=ttu`
    );
    this.#map = L.map('map').setView(coord, 20);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coord).addTo(this.#map).bindPopup('your position').openPopup();
    this.#map.on('click', this._showForm.bind(this));
  }

  //# show form
  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  //# hide form
  _hideForm() {
    //# empty input
    inputDuration.value =
      inputCadence.value =
      inputDistance.value =
      inputType.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {}

  _newWorkout(e) {
    e.preventDefault();
    const { lat, lng } = this.#mapEvent.latlng;
    function checkValidInput(...inputs) {
      return inputs.every(value => {
        return Number.isFinite(value) && value > 0;
      });
    }

    //# get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const unitSpeed = +(type === 'running'
      ? inputCadence.value
      : inputElevation.value);

    //# check valid data
    if (!checkValidInput(distance, duration, unitSpeed)) {
      alert('suka');
      return;
    }

    //# create Runing or cycling
    let workout;
    if (type === 'running') {
      workout = new Running([lat, lng], distance, duration, unitSpeed);
    } else {
      workout = new Cycling([lat, lng], distance, duration, unitSpeed);
    }
    console.log(workout);
    //# push the workout to the list
    this.#listWorkout.push(workout);

    //# display it as a marker on the map
    this._renderWorkoutMarker(workout);

    //# render work out as a list
    this._renderWorkout(workout);

    //# hide the form and clear input
    this._hideForm();
    //# clear form

    //# display marker
  }

  //# render work out
  _renderWorkout(workout) {
    const isRunningType = workout.type === 'running';
    console.log(isRunningType);
    const html = ` <li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
<h2 class="workout__title">${workout.description}</h2>
<div class="workout__details">
  <span class="workout__icon">${isRunningType ? '🏃‍♂️' : '🚴‍♀️'}</span>
  <span class="workout__value">${workout.distance} </span>
  <span class="workout__unit">km</span>
</div>
<div class="workout__details">
  <span class="workout__icon">⏱</span>
  <span class="workout__value">${workout.duration} </span>
  <span class="workout__unit">min</span>
</div>
<div class="workout__details">
  <span class="workout__icon">⚡️</span>
  <span class="workout__value">${
    isRunningType ? workout.pace.toFixed(1) : workout.speed.toFixed(1)
  } </span>
  <span class="workout__unit">min/km</span>
</div>
<div class="workout__details">
  <span class="workout__icon">${isRunningType ? '🦶🏼' : '⛰'}</span>
  <span class="workout__value">${
    workout.type === 'running' ? workout.cadence : workout.elevGain
  } </span>
  <span class="workout__unit">${isRunningType ? 'spm' : 'm'}</span>
</div>
</li>`;

    containerWorkouts.insertAdjacentHTML('afterbegin', html);
  }

  //# reder workout marker
  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }
}

//# submit form

//# one of the most important thing in architecture is how and where we store data (class not which database we will use)
//# bind() function to bind a method to a specific this keyword to avoid it be undefined
const app = new App();
//# function to print to colsole
function print(value) {
  console.log(value);
}
