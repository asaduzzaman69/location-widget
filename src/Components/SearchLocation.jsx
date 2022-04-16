import React, { useState } from 'react';
import './SearchLocation.css';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Locations from './Locations';
import styled from 'styled-components'

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


    /*  const searchInput = {
         border: 'none',
         height: '100%',
         width: '100%',
         'focus': {
             outline: 'none'
         }
     } */

    const SearchInput = styled.input`
    border: none;
    height: 100%;
    width: 100%;
    &:focus{
        outline: none
    }
    `

    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: ' #044fff',
        color: 'white',
        fontWeight: '600',
        textTransform: 'capitalize',
        border: 'none',
        borderRadius: '10px',
        width: '210px',
        padding: '10px',
        cursor: 'pointer',
        marginTop: '8px',
        marginBottom: '8px',
    }

    const arrowContainer = {
        display: 'flex',
        background: ' #0040cc',
        padding: '4px',
        borderRadius: '10px',
        color: 'white',
    }
    return (
        <div style={{
            borderRadius: '10px',
            paddingLeft: '8px',
            paddingRight: '8px',
            boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
            display: 'flex',
            position: 'relative'
        }}>
            <div style={{
                flex: 1
            }}>

                <SearchInput value={location} onChange={handleChange} placeholder='Search Your location' />
            </div>
            <button onClick={estimateHandler} style={buttonStyle}>
                estimate my income
                <span style={arrowContainer}>
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