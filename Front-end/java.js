// URL de l'API exposée par le backend
const API_URL = "http://localhost:8000/stations";

// Initialiser la carte Leaflet
const map = L.map('map').setView([48.1054731623499, -1.67710694501412], 13);

// Ajouter une couche OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fonction pour charger les données des stations
async function loadStations() {
  try {
    // Récupérer les données depuis le backend
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    
    const data = await response.json();
    const stations = data.stations; // Tableau des stations

    // Parcourir les stations et les afficher sur la carte
    stations.forEach(station => {
      const { name, coords, schedule } = station;

      // Ajouter un marqueur pour chaque station
      const marker = L.marker(coords).addTo(map);
      marker.bindPopup(`<b>${name}</b>`);

      // Écouter les clics pour afficher plus d'informations
      marker.on('click', () => {
        document.getElementById('station-name').textContent = name;
        const scheduleList = document.getElementById('schedule');
        scheduleList.innerHTML = ''; // Réinitialiser la liste des horaires

        schedule.forEach(time => {
          const listItem = document.createElement('li');
          listItem.textContent = `Prochain passage : ${time}`;
          scheduleList.appendChild(listItem);
        });
      });
    });
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
}

// Charger les stations au démarrage
loadStations();
