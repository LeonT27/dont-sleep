"use strict";

function counter(s) {
  let seconds = s;
  setInterval(() => {
    seconds += 1;
    document.getElementById(
      "app"
    ).innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
  }, 1000);
}

counter(0);
//TODO dontSleep on init
let dontSleep = "wakeLock" in navigator ? true : null;

document.getElementsByTagName("BODY")[0].classList.add(dontSleep);

console.log(dontSleep);

document.addEventListener("visibilitychange", async () => {
  if (dontSleep !== null && document.visibilityState === "visible") {
    dontSleep = await navigator.wakeLock.request("screen");

    console.log(dontSleep);
  }
});
