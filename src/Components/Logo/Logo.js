import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';
import brain from './Logo.png'

const Logo = () => {
    return(
        <div className='ml4 mb2'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 120, width: 120 }} >
                <div className="Tilt-inner">
                    <img src={brain} alt='brain' />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;