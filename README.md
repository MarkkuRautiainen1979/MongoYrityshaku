# Mongoyrityshaku

Applikaatio hakee ohjelmistoalan yrityksiä MongoDB - tietokannasta. Yritykset voidaan hakea yksittäisen yrityksen nimen perusteella, paikkakunnan perusteella tai listasta, joka listaa
kaikki yritykset , mitkä löytyvät tietokannasta . Yritykset täytyvät olla tietenkin valmiina tallennettuna tietokantaan. Yritysten tiedot ja tietorakenne on patentti - ja rekisterihallituksen julkisesta YTJ rekisteristä sivulta https://avoindata.prh.fi/ytj.html. Ne ovat kansiossa nimellä yritystiedot.json, josta ne pitää viedä MongoDB - tietokantaan. Applikaatio käyttää react-leaflet karttaa näyttääkseen yritysten sijainnin.

## Versio 1.6

Reactin komponentti tiedostot : Valinta.js, MapComponent.js, AddPopup.js ja backend servertiedosto : server.js
Ulkoiset tiedostot : kunnat.json, yritystiedot.json 
