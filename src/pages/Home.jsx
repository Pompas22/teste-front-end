import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const piracicabaCenter = [-22.725, -47.6476];
const shoppingCoords = [-22.70411, -47.64964];
const shoppingPolygon = [
  [-22.70450, -47.65010],
  [-22.70380, -47.65010],
  [-22.70380, -47.64920],
  [-22.70450, -47.64920],
];

function DrawPolygon({ setPoints }) {
  useMapEvents({
    click(e) {
      setPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
    },
  });
  return null;
}

export default function Home() {
  const [fencePoints, setFencePoints] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const shoppingIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  function handleLogout() {
    localStorage.removeItem("loggedUser");
    window.location.reload();
  }
  
  return (
    <div className="fade-in">
      <h2>Olá, {loggedUser?.name}!</h2>
      <h2>Mapa de Piracicaba</h2>
      <MapContainer
        center={piracicabaCenter}
        zoom={14}
        className="map-container"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={shoppingCoords} icon={shoppingIcon}>
          <Popup>Shopping de Piracicaba</Popup>
        </Marker>

        <Polygon positions={shoppingPolygon} color="blue" />

        {fencePoints.length > 1 && <Polygon positions={fencePoints} color="green" />}

        <DrawPolygon setPoints={setFencePoints} />
      </MapContainer>

      <button onClick={handleLogout} style={{ marginTop: "15px" }}>
        Sair
      </button>
    </div>
  );
}
