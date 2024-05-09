'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
    const { latitude, longitude } = position.coords;
    const coord = [latitude, longitude];

    console.log(latitude, longitude);
    console.log(
      `https://www.google.com/maps/@${latitude},${longitude},17z?entry=ttu`
    );
    const map = L.map('map').setView(coord, 20);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coord).addTo(map).bindPopup('your position').openPopup();
  },
  function () {
    alert('where are you now');
  }
);

function oke() {
  console.log('>>>>>');
}
console.log(firstName);
print();
function nahui() {}
