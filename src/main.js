"use strict";

//INIT
let intervalId = counter();
let ds = "wakeLock" in navigator ? true : null;

(async () => {
  await dontSleep();
})();

//VisibilityChange
document.addEventListener("visibilitychange", async () => {
  if (ds !== null && document.visibilityState === "visible") {
    await dontSleep();
    intervalId = counter();
  }

  if (document.visibilityState === "hidden") {
    clearCounter(intervalId);
  }
});

//FUNC
async function dontSleep() {
  try {
    let ds = await navigator.wakeLock.request("screen");
    text_color("true");
  } catch (error) {
    text_color("false");
    clearCounter(intervalId);
    document.getElementById("count").innerHTML = `<p>Refresh the page plz.</p>`;
  }
}

let text_color = (nameClass) => {
  let body = document.getElementsByTagName("BODY")[0];
  body.classList.remove(...body.classList);
  body.classList.add(nameClass);
};

function counter() {
  let seconds = 0;
  return setInterval(() => {
    seconds += 1;
    document.getElementById(
      "count"
    ).innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
  }, 1000);
}

function clearCounter(intervalId) {
  clearInterval(intervalId);
  document.getElementById(
    "count"
  ).innerHTML = `<p>You have been here for 0 seconds.</p>`;
}
