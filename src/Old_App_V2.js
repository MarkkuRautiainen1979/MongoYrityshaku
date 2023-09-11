import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [cityInput, setCityInput] = useState(''); // Lisää tila syötetylle kaupungille
  const [nameInput, setNameInput] = useState(''); // Lisää tila syötetylle yrityksen nimelle
  const [selectedCity, setSelectedCity] = useState(''); // Lisää tila valitulle kaupungille
  const [selectedCompany, setSelectedCompany] = useState(''); // Lisää tila valitulle yritykselle
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [isCompanySelected, setIsCompanySelected] = useState(false);

  // Funktio hakee tietoja tietokannasta
  async function fetchItems() {
    try {
      const response = await fetch('http://localhost:3001/items');
  
      // Yritetään tulkita vastaus JSON-muotoiseksi
      const data = await response.json();
      console.log('Vastaus (JSON):', data); // Tulosta vastaus JSON-muoto konsoliin
  
      // Lajitellaan data rekisteröintipäivämäärän perusteella
      data.sort((a, b) => new Date(a.Rekisterointi_pvm) - new Date(b.Rekisterointi_pvm));

      // Muuta päivämäärät oikeaan muotoon, poistetaan tunnit
      data.forEach(item => {
        item.Rekisterointi_pvm = new Date(item.Rekisterointi_pvm).toLocaleDateString();
      });

      setItems(data); // Asetetaan haettu data tilaan
    } catch (error) {
      console.error('Virhe haettaessa tietoja:', error);
    }
  }

  useEffect(() => {
    fetchItems(); // Kutsutaan funktiota tietojen hakemiseksi komponentin ensimmäisellä renderöinnillä
  }, []);

  const handleCityChange = () => {
    setSelectedCity(cityInput.toUpperCase()); // Muuta syötetty kaupunki isoin kirjaimin kirjoitetuksi
    setSelectedCompany(''); // Muuta syötetty kaupunki isoin kirjaimin kirjoitetuksi
    setIsCitySelected(true);
    setIsCompanySelected(false);
    setNameInput('');
  };

  const handleCompanyChange = () => {
    setSelectedCompany(nameInput); // Kirjoitettu yrityksen nimi hakuun
    setSelectedCity(''); // Tyhjennä paikkakunnan valinta
    setIsCompanySelected(true);
    setIsCitySelected(false);
    setCityInput('');
  };

  return (
    <div className="App">
      <h1>Tietokannan tulokset</h1>
      <h2>Ohjelmistoalan firmat</h2>
      <div>
        <h2>Valitse paikkakunta</h2>
        <input style={{ width: '400px', height: '50px', fontSize: '20px' }}
          type="text"
          placeholder="Kirjoita paikkakunta"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <a> </a><button onClick={handleCityChange} style={{ width : '100px', height: '50px'}} >Valitse</button>
      </div>
      <div>
        <h2>Tai Valitse yrityksen nimi</h2>
        <input style={{ width: '400px', height: '50px', fontSize: '20px' }}
          type="text"
          placeholder="Kirjoita yrityksen nimi"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <a> </a><button onClick={handleCompanyChange} style={{ width : '100px', height: '50px'}}>Valitse</button>
      </div>
      {items && items.length > 0 && selectedCity !== null && selectedCity !== undefined && (
        <ul>
          {items
            .filter((item) => {
              if (isCitySelected && selectedCity) {
                const kaupunki = item.Kaupunki;
                return kaupunki === selectedCity;
              } else if (isCompanySelected && selectedCompany) {
                return item.Nimi.toLowerCase().includes(selectedCompany.toLowerCase());
              }
            })
            .map((item, index) => (
              <li key={index}>
                <h2>{item.Nimi}</h2>
                <p>Y-tunnus : {item.Y_tunnus}</p>
                <p>Rekisteröintipäivämäärä : {item.Rekisterointi_pvm}</p>
                <p>Yhtiömuoto : {item.Yhtiomuoto}</p>
                <p>Toimiala : {item.Toimiala}</p>
                <p>Paikkakunta : {item.Kaupunki}</p>
                <p>Osoite : {item.Osoite}</p>
                <p>Yhteystiedot : {item.Yhteystiedot}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default App;