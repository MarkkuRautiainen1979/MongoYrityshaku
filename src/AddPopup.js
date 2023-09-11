import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';

function AddPopup ({ paikkakunta, lat, lon, firma, osoite,yhteystiedot }) {
  const [markerPosition, setMarkerPosition] = useState([lat, lon]);

   // Määrittele ikonin URL ternary operaattorilla
   const customIcon = new L.Icon({
    iconUrl: paikkakunta === "JOENSUU" ? './joensuu.png' : './infoicon.png',
    iconSize: [80, 80],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // const iconMap = {
  //  owl: new L.Icon({
  //    iconUrl: './infoicon.png',
 //     iconSize: [50, 50],
//      iconAnchor: [16, 32],
//      popupAnchor: [0, -32],
//    }),
//    vwbeetle: new L.Icon({
//      iconUrl: './owl.png',
//      iconSize: [50, 50],
//      iconAnchor: [16, 32],
//      popupAnchor: [0, -32],
//    }),
//    diamond: new L.Icon({
//      iconUrl: './joensuu.png',
//      iconSize: [80, 80],
//      iconAnchor: [16, 32],
//      popupAnchor: [0, -32],
//    }),
//    // Lisää tarvittaessa muita ikonityyppejä ja niiden vastaavat ikonit
//   };

useEffect(() => {
  // Päivitä Markerin sijainti valitun kaupungin mukaan
  setMarkerPosition([lat, lon]);

}, [lat, lon]);

// Tarkista, onko yhteystiedot URL-osoite
const isURL = yhteystiedot.startsWith("www.")

 // Lisää "http://" etuliite, jos se puuttuu
 const correctedURL =  `http://${yhteystiedot}`;
 console.log(correctedURL)

 // Tarkista, onko firma-arvo "Ei valittua yritystä"
 if (firma === "Ei valittua yritystä") {
  return (
    <Marker position={markerPosition} icon={customIcon}>
      <Popup>
        Paikkakunta: {paikkakunta} <br />
        Lat: {lat.toFixed(6)} <br />
        Lon: {lon.toFixed(6)} <br />
        Yritystä ei valittu.
      </Popup>
    </Marker>
  );
}

  return (
      <Marker position={markerPosition} icon={customIcon}>
        <Popup>
        {paikkakunta !== 'TUNTEMATON' ? (
          <span>
            Yritys: {firma} <br />
            Paikkakunta: {paikkakunta} <br />
            Lat: {lat.toFixed(6)} <br />
            Lon: {lon.toFixed(6)} <br />
            Osoite: {osoite} <br />
            {isURL ? (
              <a href={correctedURL} target="_blank">Linkki verkkosivulle</a>
            ) : (
              `Yhteystiedot: ${yhteystiedot}`
            )}
          </span>
        ) : (
          <span>
            Yritys: {firma} <br />
            Paikkakunta: Tuntematon <br />
            {isURL ? (
              <a href={correctedURL} target="_blank">Linkki verkkosivulle</a>
            ) : (
              `Yhteystiedot: ${yhteystiedot}`
            )}
          </span>
        )}
        </Popup>
      </Marker>
  );
}

export default AddPopup;