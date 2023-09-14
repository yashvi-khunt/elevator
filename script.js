"use strict";
let numLifts;
let numFloors;
let lifts;

let toFloor;
let activeLift;
let liftState = [];
let travelDistance = 0;

const calcDistance = function (destination) {
  const distances = liftState.map((state) => {
    // console.log(`state: ${state}`);
    return Math.abs(state - destination);
  });
  //   console.log(distances);
  const minDis = Math.min(...distances);
  const liftIndex = distances.indexOf(minDis);
  return [minDis, liftIndex];
};

const moveLift = function (lift) {
  lift.children[0].style.fill = "aqua";
  toFloor = lift.id.split("-")[1];
  [travelDistance, activeLift] = calcDistance(toFloor);
  console.log(`activeLift: ${activeLift}`);
  console.log(`distance: ${travelDistance}`);
  liftState[activeLift] = toFloor;
  lifts[activeLift].style.bottom = `${108 * (toFloor - 1)}px`;
  document.documentElement.style.setProperty("--speed", `${travelDistance}s`);
};

//Adding Lift and Floors dynamically
const addLifts = function () {
  const liftControl = document.getElementById("control");
  const liftManintanence = document.querySelector(".maintanence");
  let liftHtml = "";
  let maintainHtml = "";

  for (let i = 0; i < numLifts; i++) {
    liftHtml += `<div id="lift${i + 1}" class="lifts top-box">
        <div class="compartment">`;
    for (let j = numFloors; j > 0; j--) {
      liftHtml += `<div>${j}</div>`;
    }
    liftHtml += `</div>
        <div class="lift-block"></div>
    </div>`;

    maintainHtml += `<div class="maintain mbutton"> <input type="checkbox" id="switch${
      i + 1
    }" class="checkbox" onclick='outOfOrder(this)' />
    <label for="switch${i + 1}" class="toggle">
        <p>ON</p>
        <p>OFF</p>
        <p class="toggle-switch"></p>
    </label>
</div>`;

    liftState.push(1);
  }

  liftControl.insertAdjacentHTML("beforebegin", liftHtml);
  liftManintanence.insertAdjacentHTML("afterbegin", maintainHtml);
  let controlHtml = "";
  for (let j = numFloors; j > 0; j--) {
    controlHtml += `<div id="floor-${j}" class="floors">${j}
        ${
          j === numFloors
            ? ``
            : `<button id="btn-${j}-up" class="up" onclick="moveLift(this)"><svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 16q0-3.232 1.28-6.208t3.392-5.12 5.12-3.392 6.208-1.28q3.264 0 6.24 1.28t5.088 3.392 3.392 5.12 1.28 6.208q0 3.264-1.28 6.208t-3.392 5.12-5.12 3.424-6.208 1.248-6.208-1.248-5.12-3.424-3.392-5.12-1.28-6.208zM4 16q0 3.264 1.6 6.048t4.384 4.352 6.016 1.6 6.016-1.6 4.384-4.352 1.6-6.048-1.6-6.016-4.384-4.352-6.016-1.632-6.016 1.632-4.384 4.352-1.6 6.016z"></path>
            <path d="M10.048 13.632q0.096-0.608 0.544-1.056l4-4q0.576-0.576 1.408-0.576t1.408 0.576l4 4q0.448 0.448 0.544 1.056t-0.096 1.152q-0.224 0.544-0.736 0.896t-1.12 0.32h-1.984v6.016q0 0.832-0.608 1.408t-1.408 0.576-1.408-0.576-0.576-1.408v-6.016h-2.016q-0.608 0-1.12-0.32t-0.736-0.896-0.096-1.152z"></path>
            </svg></button>`
        }
        ${
          j === 1
            ? ``
            : `
         <button id="btn-${j}-down" class="down" onclick="moveLift(this)"><svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
         <title>down-round</title>
         <path d="M0 16q0-3.232 1.28-6.208t3.392-5.12 5.12-3.392 6.208-1.28q3.264 0 6.24 1.28t5.088 3.392 3.392 5.12 1.28 6.208q0 3.264-1.28 6.208t-3.392 5.12-5.12 3.424-6.208 1.248-6.208-1.248-5.12-3.424-3.392-5.12-1.28-6.208zM4 16q0 3.264 1.6 6.048t4.384 4.352 6.016 1.6 6.016-1.6 4.384-4.352 1.6-6.048-1.6-6.016-4.384-4.352-6.016-1.632-6.016 1.632-4.384 4.352-1.6 6.016zM10.048 18.4q-0.128-0.576 0.096-1.152t0.736-0.896 1.12-0.352h2.016v-5.984q0-0.832 0.576-1.408t1.408-0.608 1.408 0.608 0.608 1.408v5.984h1.984q0.608 0 1.12 0.352t0.736 0.896q0.224 0.576 0.096 1.152t-0.544 1.024l-4 4q-0.576 0.576-1.408 0.576t-1.408-0.576l-4-4q-0.448-0.416-0.544-1.024z"></path>
         </svg></button>`
        }
                </div>`;
  }
  liftControl.insertAdjacentHTML("afterbegin", controlHtml);
};

const init = function () {
  //   numLifts = prompt("Enter number of lifts");
  //   numFloors = prompt("Enter number of floors");
  numLifts = 3;
  numFloors = 7;
  addLifts();

  lifts = [...document.getElementsByClassName("lift-block")];
};

init();

const outOfOrder = function (lift) {
  console.log(lift);
  let liftnum = lift.id.slice(-1);
  let block = document.getElementById(`lift${liftnum}`);
  console.log(block.children[1]);
  block.children[1].classList.toggle("outoforder");
  block.children[1].style.bottom = 0;
};
