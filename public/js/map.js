const lat = -23.9510924
const lng = -46.3310366

const options = {
    dragging: false,
    touchZoom:true,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: true
}

const map = L.map('mapid', options).setView([lat,lng], 16);
const marker = L.marker([lat, lng]).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

marker.bindPopup("<b>Hospital São Lucas</b><br>Av. Ana Costa 168").openPopup();

