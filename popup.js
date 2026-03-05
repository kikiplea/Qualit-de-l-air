const btn = document.querySelector("#btnSend");
const input = document.querySelector("#city");
const quality_block = document.querySelector("#quality_block");
const quality_value = document.querySelector("#quality_value");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM chargé !");
  console.log(btn);

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("CLICK !!");

    const value = input.value.trim();
    if (value === "") {
      alert("Veuillez entrer une ville");
      return;
    }

    console.log(value);

    geteval(value).then(result => {
      if (!result) return;

      
      const aqi = result.current.air_quality["us-epa-index"];

      quality_value.innerText = value + " : AQI = " + aqi;

      
      quality_block.className = "";
quality_block.style.display = "block";

let label = "";

if (aqi === 1) {
  quality_block.classList.add("good");
  label = "Bon 🟢";
}
else if (aqi === 2) {
  quality_block.classList.add("medium");
  label = "Modéré 🟡";
}
else if (aqi === 3) {
  quality_block.classList.add("bad");
  label = "Mauvais pour personnes sensibles 🟠";
}
else if (aqi === 4) {
  quality_block.classList.add("bad");
  label = "Mauvais 🔴";
}
else if (aqi === 5) {
  quality_block.classList.add("verybad");
  label = "Très mauvais 🟣";
}
else if (aqi === 6) {
  quality_block.classList.add("verybad");
  label = "Dangereux ⚫";
}

    });
  });
});

async function geteval(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=24e8a589469b4f2cb18133002261301&q=${city}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error("Ville introuvable");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Erreur :", error);
    alert("Erreur lors de la récupération des données");
    return null;
  }
}
