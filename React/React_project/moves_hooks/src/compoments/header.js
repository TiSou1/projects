import React from 'react';

const Header = (props) => {
    return (
        <header className='APp-header'>
            <h2>{props.txt}</h2>
        </header>
    );
}

export default Header;