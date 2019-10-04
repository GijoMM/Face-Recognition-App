import React from 'react';

const Rank = ({name, entrie}) => {
    return (
        <div>
            <div className=' white f3'>
                {`${name}, your current rank is...`}
            </div>
            <div className=' white f1'>
                {entrie}
            </div> 
        </div>
    );
}

export default Rank;