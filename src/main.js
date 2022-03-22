"use strict";

let state = {
  seconds: 0,
  counterId: 0,
  dontSleep: null,
};

let incrementSeconds = () => state.seconds++;
let resetSeconds = () => (state.seconds = 0);
let runCounter = () => (state.counterId = counter());
let activateDontSleep = async () => (state.dontSleep = await dontSleep());

let $D = document;
let $body = $D.getElementsByTagName("BODY")[0];
let $counterText = $D.getElementById("counter-text");
let $counter = $D.getElementById("counter");
let $error = $D.getElementById("error");

let setTextColor = (nameClass) => {
  $body.classList.remove(...$body.classList);
  $body.classList.add(nameClass);
};
let updateCounterView = () => ($counter.innerHTML = state.seconds);
let resetCounterView = () => ($counter.innerHTML = 0);
let showErrors = () => {
  $counterText.classList.add("hidden");
  $error.classList.remove("hidden");
};

let onVisibilityChange = () => {
  if (state.dontSleep !== null && $D.visibilityState === "visible") {
    activateDontSleep();
    runCounter();
  }

  if ($D.visibilityState === "hidden") {
    clearCounter(state.counterId);
  }
};

let counter = () => {
  return setInterval(() => {
    incrementSeconds();
    updateCounterView();
  }, 1000);
};

let clearCounter = (intervalId) => {
  resetSeconds();
  clearInterval(intervalId);
  resetCounterView();
};

let dontSleep = async () => {
  try {
    setTextColor("green-text");
    return await navigator.wakeLock.request("screen");
  } catch (error) {
    clearCounter(state.counterId);
    showErrors();
    setTextColor("red-text");
    return null;
  }
};

$D.onvisibilitychange = () => onVisibilityChange();

runCounter();
activateDontSleep();
