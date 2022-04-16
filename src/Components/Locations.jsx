import React from 'react'
import './Locations.css'
const Locations = ({ suggestions, handleLocationSelect, location }) => {
    return (
        <ul className='locations-container'>
            {
                suggestions.length > 0 ? suggestions.map((el, idx) => <li onClick={() => handleLocationSelect(el.geometry.coordinates, el.place_name)} key={`suggestions-key-${idx}`}>{el.place_name}</li>) : location !== '' ? (
                    <p className='details-text'>Please try to add some details</p>
                ) : ''
            }
        </ul>
    )
}

export default Locations;
