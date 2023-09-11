import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';



function MapComponent({selectedCity}) {
  console.log(selectedCity);
  const mapStyle = {
    width: '50%', // Aseta haluttu leveys
    height: '100vh', // Täyttää koko näytön korkeuden
    position: 'fixed', // Kiinnitetään vasempaan reunaan
    top: 0, // Kiinnitetään ylälaitaan
    left: 0, // Kiinnitetään vasempaan laitaan
    zIndex: 1, // Asetetaan tarvittaessa korkein taso
    top: '100px'
  };
  const kunnatData = require('./kunnat.json');

   // Määrittele lat ja lon oletusarvoiksi
   let lat = 62.59246;
   let lon = 29.76896;

    const loydettyTieto = kunnatData.find((item) => item.nimi === selectedCity);

 if (loydettyTieto) {
    const nimi = loydettyTieto.nimi;
         lat = loydettyTieto.lat[0]; // Latitudi voi olla taulukossa, joten otetaan ensimmäinen arvo
        lon = loydettyTieto.lon[0]; // Longitudi voi olla taulukossa, joten otetaan ensimmäinen arvo

 console.log(`Nimi: ${nimi}`);
  console.log(`Lat: ${lat}`);
 console.log(`Lon: ${lon}`);
} else {
  lat = 62.59246;
  lon = 29.76896;
  console.log(`Ei löytynyt arvoa "${selectedCity}"`);
}


  return (
    <div style={mapStyle}>
      <MapContainer

        id="mapId"
        doubleClickZoom={false}
        center= {{
          lat: lat,
          lng: lon,
        }}
        zoom={7}
        style={{ height: '100%' }} // Täyttää koko sisäisen divin korkeuden
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

export default MapComponent;