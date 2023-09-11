import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import AddPopup from './AddPopup.js'

function MapComponent({ paikkakunta, lat, lon, firma,osoite, yhteystiedot }) {
  const mapRef = useRef();

  useEffect(() => {

    // Päivitä kartta manuaalisesti
    if (mapRef.current) {
      mapRef.current.setView([lat, lon]);
    }
  }, [lat, lon]);

  const mapStyle = {
    width: '50%',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1,
    top: '100px',
  };

  return (
    <div style={mapStyle}>
      <MapContainer
        id="mapId"
        ref={mapRef}
        doubleClickZoom={false}
        center={{
          lat: lat,
          lng: lon,
        }}
        zoom={10}
        style={{ height: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddPopup key={paikkakunta} paikkakunta={paikkakunta} lat={lat} lon={lon} 
        firma={firma} osoite={osoite} yhteystiedot={yhteystiedot} />
      </MapContainer>
    </div>
  );
}

export default MapComponent;