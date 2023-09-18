"use strict";
let numLifts;
let numFloors;
let lifts = [];

//UI
const addLifts = function () {
  const liftControl = document.getElementById("control");
  const liftManintanence = document.querySelector(".maintanence");
  let liftHtml = "";
  let maintainHtml = "";

  for (let i = 0; i < numLifts; i++) {
    liftHtml += `<div id="lift${i + 1}" class="lifts top-box">
          <div class="compartment">`;
    liftHtml += `</div>
          <div class="lift-block" id="liftBlock${i + 1}" ></div>
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

    lifts.push({
      liftName: `lift${i + 1}`,
      status: true,
      currentFloor: 1,
      destination: 1,
      toFloors: [],
    });
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
  numLifts = 3;
  numFloors = 7;
  addLifts();
};

init();
const moveFloorUp = function (lift) {
  lift.currentFloor += 1;
  let block = document.getElementById(lift.liftName).children[1];
  let liftBottom = block.style.bottom || `0px`;
  liftBottom = liftBottom.slice(0, -2);
  liftBottom = +liftBottom + 108;
  console.log(block.style.bottom);
  block.style.bottom = `${liftBottom}px`;
  console.log(block.style.bottom);
};

const moveFloorDown = function (lift) {
  lift.currentFloor = 1;
  let block = document.getElementById(lift.liftName).children[1];
  let liftBottom = block.style.bottom || `0px`;
  liftBottom = liftBottom.slice(0, -2);
  liftBottom = +liftBottom - 108;
  console.log(block.style.bottom);
  block.style.bottom = `${liftBottom}px`;
  console.log(block.style.bottom);
};

const travel = function (floor, lift, direction) {
  // console.log(lift);
  lift.destination = floor;
  console.log(lift);
  if (direction === "up") {
    console.log(lift.currentFloor, lift.destination);
    while (lift.currentFloor !== lift.destination) {
      if (lift.currentFloor <= floor) {
        console.log(lift.currentFloor);
        moveFloorUp(lift);
      } else {
        console.log(lift.currentFloor);
        moveFloorDown(lift);
      }
      // console.log("o");
    }
  }

  console.log(lift.currentFloor);
};

const selectLift = function (liftArray, destination, direction) {
  console.log(liftArray);
  const arr = liftArray.map((ele) => Math.abs(ele.currentFloor - destination));
  // console.log(arr);
  const min = Math.min(...arr);
  // console.log(min);
  return liftArray[arr.findIndex((ele) => ele === min)].liftName;
};
// console.log(lifts);

const moveLift = function (element) {
  // Array of active lifts
  const activeLifts = lifts.filter((lift) => lift.status === true);

  const toFloor = Number(element.id.split("-")[1]);
  const direction = element.id.split("-")[2];
  console.log(direction);

  const currentLiftName = selectLift(activeLifts, toFloor, direction);
  console.log(currentLiftName);
  const currentLiftIndex = lifts.findIndex(
    (l) => l.liftName === currentLiftName
  );
  const currentLiftObject = lifts[currentLiftIndex];
  console.log(currentLiftObject);
  travel(toFloor, currentLiftObject, direction);
};

const outOfOrder = function (element) {
  const liftNumber = element.id.slice(-1);

  const liftBlock = document.getElementById(`liftBlock${liftNumber}`);
  // const liftBlock = liftElement.children[1];

  if (lifts[liftNumber - 1].status === true) {
    lifts[liftNumber - 1].status = false;
    liftBlock.style.bottom = 0;
  } else {
    lifts[liftNumber - 1].status = true;
  }

  liftBlock.classList.toggle("outoforder");
};
