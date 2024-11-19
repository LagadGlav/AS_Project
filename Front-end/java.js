// Initialiser la carte
const map = L.map('map').setView([48.1054731623499, -1.67710694501412], 13);

// Ajouter une couche de carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Données des stations (remplacez par des données dynamiques si disponibles)
const stations = [
  {
    name: "Charles de Gaulle",
    coords: [48.1054731623499, -1.67710694501412],
    schedule: ["12:00", "12:02", "12:05"]
  },
  {
    name: "Henri Fréville",
    coords: [48.0875767834845, -1.67485907090394],
    schedule: ["12:01", "12:04", "12:07"]
  },
  {
    name: "Italie",
    coords: [48.0865238083084, -1.66764584791703],
    schedule: ["12:03", "12:06", "12:09"]
  }
];

// Ajouter des marqueurs pour chaque station
stations.forEach(station => {
  const marker = L.marker(station.coords).addTo(map);
  marker.bindPopup(station.name);

  // Ajouter un événement au clic pour afficher les informations
  marker.on('click', () => {
    document.getElementById('station-name').textContent = station.name;
    const scheduleList = document.getElementById('schedule');
    scheduleList.innerHTML = ''; // Réinitialiser la liste

    station.schedule.forEach(time => {
      const listItem = document.createElement('li');
      listItem.textContent = `Prochain passage : ${time}`;
      scheduleList.appendChild(listItem);
    });
  });
});
