import React from 'react';
import Tilt from 'react-tilt';

const Logo = () => {
    return (
        <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
            <div className="Tilt-inner"> 👽 </div>
        </Tilt>
    );
}

export default Logo;