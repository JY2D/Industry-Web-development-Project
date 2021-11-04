import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const API_URL = "http://127.0.0.1:8000/"

function AutoCompleteInput({route}) {
    const [items, setItems] = useState([])

    useEffect(() => {
            axios.get(API_URL + route).then(res =>
                setItems(res.data)
            )
    }, [])
    console.log(items)

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }

    return (
        <div>
            <ReactSearchAutocomplete 
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            />
        </div>
    );
}

export default AutoCompleteInput;