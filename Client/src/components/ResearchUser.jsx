import React, { useState } from 'react';

const Research = (props) => {
    const [userSearch, setSearchTerm] = useState('');
    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        window.location.replace(`/user/${userSearch}`)
    };

    return (
        <form className='research'>
            <input type="text" placeholder={props.content} value={userSearch} onChange={handleInputChange} />
            <button onClick={handleSubmit}>Rechercher</button>
        </form>
    );
};

export default Research;