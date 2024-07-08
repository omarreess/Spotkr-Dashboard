import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';




const Map =  ({position}) => {
    const [location, setLocation] = useState([1,2])
    useEffect(()=>{
        position && 
             setLocation([position?.latitude, position?.longitude])
    }, [position])
    console.log(location)
    return position && (
    <div className='w-full h-full rounded-md'>
    <MapContainer center={[position?.latitude, position?.longitude]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[position?.latitude, position?.longitude]}>
      <Popup>
        Location
      </Popup>
    </Marker>
  </MapContainer>
  </div>
  )
}

export default Map
