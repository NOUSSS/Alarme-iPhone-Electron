let isStarted = false;
let minutesInterval;
let secondesInterval;
let milliSecondesInterval;

const borderCache = "border-top: solid 1px rgb(28 28 28);";

window.onload = function () {
  const minutes = document.getElementsByClassName("minutes")[0];
  const secondes = document.getElementsByClassName("secondes")[0];
  const millisecondes = document.getElementsByClassName("millisecondes")[0];

  const toursList = document.querySelector(".toursList");

  const startButton = document.querySelector(".start");
  const lapsButton = document.querySelector(".laps");

  let index = 0;

  startButton.addEventListener("click", () => {
    document.querySelector(".bar").style.display = "none";

    if (isStarted) {
      isStarted = false;

      startButton.style.backgroundColor = "rgb(8 24 9)";
      startButton.style.color = "rgb(0 255 0)";
      startButton.style.border = "2px solid rgb(8 24 9)";
      startButton.innerText = "Démarrer";

      lapsButton.innerText = "Effacer";
      lapsButton.style.padding = "7px";

      clearInterval(milliSecondesInterval);
      clearInterval(secondesInterval);
      clearInterval(minutesInterval);
    } else {
      isStarted = true;
      index++;

      if (index === 1) {
        toursList.getElementsByTagName("li")[0].style = "";
        toursList.getElementsByTagName("li")[0].innerHTML = toursList
          .getElementsByTagName("li")[0]
          .innerHTML.replace("{count}", index);
      }

      lapsButton.style.opacity = "1";
      lapsButton.removeAttribute("disabled");

      startButton.style.backgroundColor = "#3a0e0e";
      startButton.style.color = "#ff0303";
      startButton.style.border = "2px solid #3a0e0e";
      startButton.innerText = "Arrêter";

      lapsButton.innerText = "Tour";
      lapsButton.style.padding == "9px";

      milliSecondesInterval = setInterval(() => {
        if (Number(millisecondes.innerText) === 99) return (millisecondes.innerText = "00");
        else {
          millisecondes.innerText = (Number(millisecondes.innerText) + 1)
            .toString()
            .padStart("2", "0");
        }
      }, 10);

      secondesInterval = setInterval(() => {
        if (Number(secondes.innerText) === 59) return (secondes.innerText = "00");
        secondes.innerText = (Number(secondes.innerText) + 1).toString().padStart("2", "0");
      }, 1000);

      minutesInterval = setInterval(() => {
        minutes.innerText = (Number(minutes.innerText) + 1).toString().padStart("2", "0");
      }, 60000);
    }
  });

  lapsButton.addEventListener("click", () => {
    if (lapsButton.innerText === "Effacer") {
      document.querySelector(".bar").style = "";

      toursList.innerHTML = "";

      for (const li of toursList.getElementsByTagName("li")) {
        li.remove();
      }

      const newList = document.createElement("li");
      newList.style.display = "none";
      newList.innerHTML = `
      Tour {count}
      <div class="secondCounter"></div>
      `;

      toursList.appendChild(newList);

      index = 0;

      lapsButton.style.opacity = "0.5";
      lapsButton.setAttribute("disabled", "disabled");

      minutes.innerText = "00";
      secondes.innerText = "00";
      millisecondes.innerText = "00";

      lapsButton.innerText = "Tour";
    } else if (lapsButton.innerText === "Tour") {
      index++;

      if (index - 1 === 1) {
        const currentString = document.querySelector(".counter p").innerText.split("\n").join("");
        const replaceString = document.querySelector(".secondCounter");

        replaceString.innerHTML = currentString;
      } else {
        const newList = document.createElement("li");
        newList.innerHTML = `
        Tour {count}
        <div class="secondCounter"></div>`;

        const currentString = document.querySelector(".counter p").innerText.split("\n").join("");

        newList.innerHTML = newList.innerHTML.replace("{count}", index - 1);
        newList.getElementsByTagName("div")[0].innerHTML = currentString;

        toursList.appendChild(newList);
      }
    }
  });
};
