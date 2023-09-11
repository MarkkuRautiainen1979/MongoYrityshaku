import React, { useState, useEffect } from 'react';
import './App.css';

function Valinta() {
  const [items, setItems] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [isCompanySelected, setIsCompanySelected] = useState(false);
  const [citySummaries, setCitySummaries] = useState({});
  const [showAll, setShowAll] = useState(true);

  async function fetchItems() {
    try {
      const response = await fetch('http://localhost:3001/items');

      let data = await response.json();
      console.log('Vastaus (JSON):', data);

      data.sort((a, b) => new Date(a.Rekisterointi_pvm) - new Date(b.Rekisterointi_pvm));

      data.forEach(item => {
        if (item.Kaupunki === null || item.Kaupunki === undefined || item.Kaupunki ==='' || item.Kaupunki ===' ') {
          item.Kaupunki = 'TUNTEMATON';
        }
        item.Rekisterointi_pvm = new Date(item.Rekisterointi_pvm).toLocaleDateString();
      });

      setItems(data);

      const citySummaries = data.reduce((summaries, item) => {
        const kaupunki = item.Kaupunki;
        if (!summaries[kaupunki]) {
          summaries[kaupunki] = 0;
        }
        summaries[kaupunki]++;
        return summaries;
      }, {});
      setCitySummaries(citySummaries);
    } catch (error) {
      console.error('Virhe haettaessa tietoja:', error);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCityChange = () => {
    setSelectedCity(cityInput.toUpperCase());
    setSelectedCompany('');
    setIsCitySelected(true);
    setIsCompanySelected(false);
    setNameInput('');
    setShowAll(false);
  };

  const handleCompanyChange = () => {
    setSelectedCompany(nameInput);
    setSelectedCity('');
    setIsCompanySelected(true);
    setIsCitySelected(false);
    setCityInput('');
    setShowAll(false);
  };

  return (
    <div className="App">
      <div className="input-container">
        <h2>Valitse paikkakunta valikosta</h2>
      </div>
      <div className="input-container">
        <select
          style={{ width: '400px', height: '50px', fontSize: '20px' }}
          value={selectedCity}
          onChange={(e) => setCityInput(e.target.value)}
        >
          <option value="">Kaikki ({items.length})</option>
          {Object.keys(citySummaries).map((city, index) => (
            <option key={index} value={city}>
              {`${city} (${citySummaries[city]})`}
            </option>
          ))}
        </select>
        <a> </a>
        <button onClick={handleCityChange} style={{ width: '100px', height: '50px' }}>
          Paina valinta
        </button>
      </div>
      <div className="input-container">
        <h2>Tai Hae paikkakunnan tiedot nimellä</h2>
      </div>
      <div className="input-container">
        <input
          style={{ width: '400px', height: '50px', fontSize: '20px' }}
          type="text"
          placeholder="Kirjoita paikkakunnan nimi"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <a> </a>
        <button onClick={handleCityChange} style={{ width: '100px', height: '50px' }}>
          Paina valinta
        </button>
      </div>
      <div className="input-container">
        <h2>Tai Valitse yrityksen nimi</h2>
      </div>
      <div className="input-container">
        <input
          style={{ width: '400px', height: '50px', fontSize: '20px' }}
          type="text"
          placeholder="Kirjoita yrityksen nimi"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <a> </a>
        <button onClick={handleCompanyChange} style={{ width: '100px', height: '50px' }}>
          Paina valinta
        </button>
      </div>
  
      {items && items.length > 0 && (
        <ul>
          {items
            .filter((item) => {
              if (showAll) {
                return true;
              } else if (isCitySelected && selectedCity) {
                const kaupunki = item.Kaupunki;
                return kaupunki === selectedCity;
              } else if (isCompanySelected && selectedCompany) {
                return item.Nimi.toLowerCase().includes(selectedCompany.toLowerCase());
              }
              return true;
            })
            .map((item, index) => (
              <li key={index}>
                <div className="input-container">
                <h2>{item.Nimi}</h2></div>  
                <div className="input-container"><p>Y-tunnus : {item.Y_tunnus}</p></div>  
        
                <div className="input-container"><p>Rekisteröintipäivämäärä : {item.Rekisterointi_pvm}</p></div>  
                
                <div className="input-container"><p>Yhtiömuoto : {item.Yhtiomuoto}</p></div>  
               
                <div className="input-container"><p>Toimiala : {item.Toimiala}</p></div>  
                
                <div className="input-container"><p>Paikkakunta : {item.Kaupunki}</p></div>  
                
                <div className="input-container"><p>Osoite : {item.Osoite}</p></div>  
               
                <div className="input-container"><p>Yhteystiedot : {item.Yhteystiedot}</p></div>  
               
        
              </li>
            
            ))}
        </ul>
      )}
      </div>

  );
}

export default Valinta;