import React, { useState } from 'react';
import './SearchLocation.css';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Locations from './Locations';


const SearchLocation = () => {
    const [location, setLocation] = useState('');
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    })
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (e) => {
        setLocation(e.target.value);

        try {
            const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?types=country,address,place&access_token=pk.eyJ1IjoiaGltZWwxMjYiLCJhIjoiY2wxZ2FoeHM4MDd2OTNyb3JlcHZub3R4biJ9.iXUC5niBfA83FT2MYlWvpg&autocomplete=true`;
            const res = await fetch(endpoint);
            const data = await res.json();
            setSuggestions(data.features);
            setShowSuggestion(true)

        } catch (err) {
            console.log(err)
        }
    }

    const estimateHandler = () => {

    }

    const handleLocationSelect = (coords, location) => {
        const [lng, lat] = coords;

        setCoordinates({
            lat,
            lng
        })
        setLocation(location)
        setShowSuggestion(false)
    }


    return (
        <div className='search-location-container'>
            <div style={{
                flex: 1
            }}>

                <input value={location} onChange={handleChange} placeholder='Search Your location' className='search-input' />
            </div>
            <button onClick={estimateHandler} className='estimate-button'>
                estimate my income
                <span className='arrow-container'>
                    <AiOutlineArrowRight fontSize={'16px'} />
                </span>
            </button>
            {
                showSuggestion && (
                    <Locations location={location} handleLocationSelect={handleLocationSelect} suggestions={suggestions} />
                )
            }
        </div>
    )
}

export default SearchLocation;