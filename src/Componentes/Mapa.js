import PropTypes from "prop-types";
import {
  MapContainer, TileLayer, Marker, Popup
} from "react-leaflet";
/* Info mapbox:
https://docs.mapbox.com/help/getting-started/ */
/* Reverse geocoding per trobar barri o districte a partir de coordenades:
https://docs.mapbox.com/api/search/geocoding/#reverse-geocoding */
/* Exemple de com fer un cloropleth:
https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-1/ */
/* D'on has tret el geoJson:
https://vangdata.carto.com/tables/shapefiles_barcelona_distrito/public */
/* Webs random que potser serveixen:
https://w33.bcn.cat/geoBCN/exemples/1.0/capes.aspx
https://github.com/martgnz/bcn-geodata */
/* https://api.mapbox.com/styles/v1/bernatjv/cknouqecv5hu017s5twegcpys/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYmVybmF0anYiLCJhIjoiY2tub2o2emxzMWVweTJxbnhicGxiejRvOCJ9.x-GGbqA5iOhR66FnJ4DWnw */

const token = "pk.eyJ1IjoiYmVybmF0anYiLCJhIjoiY2tub2o2emxzMWVweTJxbnhicGxiejRvOCJ9.x-GGbqA5iOhR66FnJ4DWnw";
const urlMapbox = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${token}`;
const urlMapboxEUA = `https://api.mapbox.com/styles/v1/bernatjv/cknouqecv5hu017s5twegcpys/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`;
const urlMapboxBarris = `https://api.mapbox.com/styles/v1/bernatjv/cknow7tl91o6l17o1awn9zgcf/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`;
const urlDefault = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const urlBarrios = `https://api.mapbox.com/geocoding/v5/mapbox.places/2.167612130848904,41.38993034972496.json?access_token=${token}`;
const coordsBCN = [41.38993034972496, 2.167612130848904];
const coordsEUA = [39.58943721614868, -100.591495305186];

// para localizar barrio/distrito de cada incidencia
const fetchBarrio = () => {
  fetch(urlBarrios).then(resp => resp.json()).then(datos => console.log(datos));
};

const Mapa = props => {
  const { mapaBarrios } = props;
  // console.log(mapaBarrios);
  return (
    <>
      <MapContainer center={coordsBCN} zoom={13} scrollWheelZoom={false} className="mapa">
        {!mapaBarrios || (
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={urlMapboxBarris}
          />
        )}
        {mapaBarrios || (
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={urlMapbox}
          />
        )}
        <Marker position={coordsBCN}>
          <Popup>
            Tonto quien lo lea
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

Mapa.propTypes = {
  mapaBarrios: PropTypes.bool.isRequired
};

export default Mapa;
