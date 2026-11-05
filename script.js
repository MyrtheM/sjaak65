"use strict";

const weekend = {
  home: "Nieuwezijds Voorburgwal 288-2, Amsterdam",
  weather: {
    donderdag: { icon: "☁", temperature: "9°C", summary: "Fris en waarschijnlijk droog", tip: "Jas dicht, handen in de zakken en gewoon lekker lopen." },
    vrijdag: { icon: "☁", temperature: "9°C", summary: "Koud, waarschijnlijk droog", tip: "Perfect weer voor koffie, grachten en een goede jas." },
    zaterdag: { icon: "⛅", temperature: "8°C", summary: "Fris en overwegend droog", tip: "Een sjaal mee en dan lekker naar buiten." },
    zondag: { icon: "🌦", temperature: "10°C", summary: "Kans op lichte regen", tip: "Paraplu mee; er is altijd een fijn café dichtbij." },
    maandag: { icon: "🌧", temperature: "10–11°C", summary: "Kans op regen", tip: "Een droge tussenstop is zo gevonden." }
  },
  mapPlaces: [
    { name: "Oriental City", address: "Oudezijds Voorburgwal 177, Amsterdam", detail: "Dim sum · ca. 7 min lopen" },
    { name: "Gartine", address: "Taksteeg 7, Amsterdam", detail: "Ontbijt & lunch · ca. 5 min lopen" },
    { name: "Café 't Smalle", address: "Egelantiersgracht 12, Amsterdam", detail: "Bruin café · ca. 18 min lopen" },
    { name: "De Hallen", address: "Hannie Dankbaarpassage 47, Amsterdam", detail: "Markt & festival · ca. 25 min lopen" },
    { name: "H'ART Museum", address: "Amstel 51, Amsterdam", detail: "Kunst & cultuur · ca. 18 min lopen" },
    { name: "New King", address: "Zeedijk 115, Amsterdam", detail: "Chinees · ca. 8 min lopen" },
    { name: "Le Petit French Café", address: "'t Blauwe Theehuis, Vondelpark 5, Amsterdam", detail: "Pop-up t/m 8 november · Vondelpark" }
  ],
  ideas: {
    museum: { text: "Ga naar Chez Matisse in H’ART Museum; mooie kunst en fijne kamers aan de Amstel.", address: "H'ART Museum, Amstel 51, Amsterdam" },
    rondvaart: { text: "Stap op een rondvaartboot vanaf het Damrak. Een uur zitten, kijken en de stad vanuit het water zien.", address: "Rondvaart Amsterdam vertrek Damrak" },
    "bruin-cafe": { text: "Schuif aan bij Café 't Smalle aan de Egelantiersgracht. Neem vooral de tijd voor dat ene drankje.", address: "Cafe 't Smalle, Egelantiersgracht 12, Amsterdam" },
    "dim-sum": { text: "Kies de karretjes bij Oriental City en laat iedereen een paar dingen uitzoeken om te delen.", address: "Oriental City, Oudezijds Voorburgwal 177, Amsterdam" },
    wandeling: { text: "Dwaal via de 9 Straatjes, over bruggen en langs het water terug naar jullie thuisbasis.", address: "De 9 Straatjes, Amsterdam" },
    bijzonder: { text: "Als jullie bij het Vondelpark zijn: Le Petit French Café is dit weekend als pop-up bij 't Blauwe Theehuis.", address: "Le Petit French Café pop-up, 't Blauwe Theehuis, Vondelpark 5, Amsterdam" },
    regen: { text: "Zoek de warmte op in H'ART Museum, of trek je terug voor koffie en iets lekkers bij Gartine.", address: "H'ART Museum, Amstel 51, Amsterdam" }
  },
  spontaneous: [
    { text: "Een rondje langs de grachten, zonder route. De mooiste gevel wint.", address: "Grachtengordel, Amsterdam" },
    { text: "Zin in kleine hapjes? Oriental City ligt dichtbij en is een bekende favoriet.", address: "Oriental City, Oudezijds Voorburgwal 177, Amsterdam" },
    { text: "Een goede borrel in een bruine kroeg klinkt als een uitstekend tussenplan.", address: "Cafe Pieper, Prinsengracht 4, Amsterdam" },
    { text: "Kunst kijken aan de Amstel? Chez Matisse in H'ART Museum is er goed voor.", address: "H'ART Museum, Amstel 51, Amsterdam" },
    { text: "Neem de tram naar De Hallen en kijk wat er bij de Foodhallen op tafel komt.", address: "De Hallen, Hannie Dankbaarpassage 47, Amsterdam" },
    { text: "Trek richting de Jordaan en laat het volgende mooie straatje de route kiezen.", address: "Jordaan, Amsterdam" },
    { text: "Een lange koffie bij Gartine. Binnen is het knus; buiten begint de stad meteen weer.", address: "Gartine, Taksteeg 7, Amsterdam" },
    { text: "In het Vondelpark? Le Petit French Café popt dit weekend op bij 't Blauwe Theehuis.", address: "Le Petit French Café pop-up, 't Blauwe Theehuis, Vondelpark 5, Amsterdam" }
  ]
};

const mapUrl = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

document.querySelectorAll("[data-weather]").forEach((weatherElement) => {
  const forecast = weekend.weather[weatherElement.dataset.weather];
  if (!forecast) return;
  weatherElement.querySelector(".weather-icon").textContent = forecast.icon;
  weatherElement.querySelector(".weather-temp").textContent = forecast.temperature;
  weatherElement.querySelector(".weather-copy").textContent = `${forecast.summary} · ${forecast.tip}`;
  weatherElement.setAttribute("aria-label", `${forecast.temperature}, ${forecast.summary}. ${forecast.tip}`);
});

document.querySelectorAll("[data-map]").forEach((link) => {
  link.href = mapUrl(link.dataset.map);
});

document.querySelectorAll("[data-map-cards]").forEach((container) => {
  container.innerHTML = weekend.mapPlaces.map((place) => `
    <article class="map-card">
      <h3>${place.name}</h3>
      <p>${place.detail}</p>
      <a href="${mapUrl(place.address)}" target="_blank" rel="noreferrer">Open in Google Maps ↗</a>
    </article>`).join("");
});

const tabs = [...document.querySelectorAll("[role='tab'][data-day]")];
const panels = tabs.map((tab) => document.getElementById(tab.dataset.day));
const dayLabels = {
  donderdag: "donderdag 5 november",
  vrijdag: "vrijdag 6 november",
  zaterdag: "zaterdag 7 november",
  zondag: "zondag 8 november",
  maandag: "maandag 9 november"
};

const today = new Date();
const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const itineraryStart = new Date(2026, 10, 5);
const dayOffset = Math.round((todayDate - itineraryStart) / 86400000);
const todayKey = tabs[dayOffset]?.dataset.day;
const todayStatus = document.querySelector("[data-today-status]");

if (todayKey) {
  const isArrivalDay = todayKey === "donderdag";
  const hasTrainLeft = today.getHours() < 13;
  todayStatus.textContent = isArrivalDay
    ? `Vandaag: ${dayLabels[todayKey]} · ${hasTrainLeft ? "Als het goed is zitten jullie nu in de trein naar Amsterdam." : "Welkom in Amsterdam; hopelijk zijn jullie al neergestreken bij Charlotte."}`
    : `Vandaag: ${dayLabels[todayKey]} · De stad ligt aan jullie voeten.`;
  document.querySelectorAll("[data-nav-day]").forEach((link) => {
    const isToday = link.dataset.navDay === todayKey;
    link.classList.toggle("is-today", isToday);
    link.querySelector(".nav-today").hidden = !isToday;
    if (isToday) link.setAttribute("aria-current", "date");
    else link.removeAttribute("aria-current");
  });
  tabs.forEach((tab) => {
    const isToday = tab.dataset.day === todayKey;
    tab.classList.toggle("is-today", isToday);
    tab.querySelector(".day-today").hidden = !isToday;
    panels[tabs.indexOf(tab)].classList.toggle("is-today", isToday);
  });
} else {
  todayStatus.textContent = "Deze persoonlijke gids is samengesteld voor 5 t/m 9 november 2026.";
}

function selectDay(tab, focusPanel = false) {
  tabs.forEach((item, index) => {
    const active = item === tab;
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
    panels[index].hidden = !active;
  });
  if (focusPanel) document.getElementById(tab.dataset.day).focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectDay(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[nextIndex].focus();
    selectDay(tabs[nextIndex]);
  });
});

document.querySelectorAll("[data-nav-day]").forEach((link) => {
  link.addEventListener("click", () => {
    const tab = tabs.find((item) => item.dataset.day === link.dataset.navDay);
    if (tab) selectDay(tab);
  });
});

selectDay(tabs[dayOffset >= 0 && dayOffset < tabs.length ? dayOffset : 0]);

const suggestion = document.querySelector("[data-suggestion]");
const suggestionMap = document.querySelector("[data-suggestion-map]");
document.querySelector("[data-random]").addEventListener("click", () => {
  const currentText = suggestion.textContent;
  const choices = weekend.spontaneous.filter((item) => item.text !== currentText);
  const pick = choices[Math.floor(Math.random() * choices.length)];
  suggestion.textContent = pick.text;
  suggestionMap.href = mapUrl(pick.address);
  suggestionMap.hidden = false;
});

document.querySelectorAll("[data-idea]").forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-idea]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    const idea = weekend.ideas[button.dataset.idea];
    const result = document.querySelector("[data-idea-text]");
    const link = document.querySelector("[data-idea-map]");
    result.textContent = idea.text;
    link.href = mapUrl(idea.address);
    link.hidden = false;
  });
});

const favoriteKey = "amsterdam-weekend-favorites";
let favorites = new Set();
try {
  favorites = new Set(JSON.parse(localStorage.getItem(favoriteKey) || "[]"));
} catch {
  favorites = new Set();
}

function syncFavorite(button, isFavorite) {
  button.setAttribute("aria-pressed", String(isFavorite));
  button.textContent = isFavorite ? "♥" : "♡";
  const name = button.closest(".restaurant-card").querySelector("h3").textContent;
  button.setAttribute("aria-label", `${isFavorite ? "Verwijder" : "Bewaar"} ${name} ${isFavorite ? "uit" : "als"} favoriet`);
}

document.querySelectorAll(".favorite-button").forEach((button) => {
  const name = button.closest(".restaurant-card").querySelector("h3").textContent;
  syncFavorite(button, favorites.has(name));
  button.addEventListener("click", () => {
    if (favorites.has(name)) favorites.delete(name);
    else favorites.add(name);
    try { localStorage.setItem(favoriteKey, JSON.stringify([...favorites])); } catch { /* Favorieten werken ook zonder opslag. */ }
    syncFavorite(button, favorites.has(name));
  });
});

document.querySelectorAll("[data-filter]").forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const filter = filterButton.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((button) => {
      const active = button === filterButton;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".restaurant-card").forEach((card) => {
      card.hidden = filter !== "all" && !card.dataset.category.split(" ").includes(filter);
    });
  });
});

document.querySelectorAll("[data-print]").forEach((button) => button.addEventListener("click", () => window.print()));

const confettiCanvas = document.querySelector(".confetti-canvas");
const confettiContext = confettiCanvas.getContext("2d");
let confettiFrame = 0;

function celebrate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  cancelAnimationFrame(confettiFrame);
  const pixelRatio = window.devicePixelRatio || 1;
  confettiCanvas.width = window.innerWidth * pixelRatio;
  confettiCanvas.height = window.innerHeight * pixelRatio;
  confettiContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const pieces = Array.from({ length: 62 }, () => ({
    x: window.innerWidth * (.28 + Math.random() * .44),
    y: -Math.random() * 110,
    speed: 1.8 + Math.random() * 2.4,
    drift: (Math.random() - .5) * 1.4,
    rotation: Math.random() * Math.PI,
    size: 3 + Math.random() * 4,
    color: ["#d3b071", "#bd6847", "#eee2bd", "#8d4038"][Math.floor(Math.random() * 4)]
  }));
  const start = performance.now();
  function draw(now) {
    confettiContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    pieces.forEach((piece) => {
      piece.y += piece.speed;
      piece.x += piece.drift;
      piece.rotation += .035;
      confettiContext.save();
      confettiContext.translate(piece.x, piece.y);
      confettiContext.rotate(piece.rotation);
      confettiContext.fillStyle = piece.color;
      confettiContext.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 1.6);
      confettiContext.restore();
    });
    if (now - start < 1750) confettiFrame = requestAnimationFrame(draw);
    else confettiContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
  confettiFrame = requestAnimationFrame(draw);
}

document.querySelectorAll("[data-confetti]").forEach((button) => button.addEventListener("click", celebrate));