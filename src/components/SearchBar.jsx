import React, {useState} from 'react';
const SearchBar = ({onSearch}) => {
    const [searchQuery, setQuery] = useState('')

    const handelSubmit=(e)=>{
        e.preventDefault()
        onSearch(searchQuery)
    }

    return (
        <form onSubmit={handelSubmit}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введите название фильма"
            />
            <button type="submit"><p>Искать</p></button>
        </form>
    );
};

export default SearchBar;