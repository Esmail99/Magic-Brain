import React from 'react';

const Hints = () => {
    return(
        <div className='center mt4'>
            <div className='tl white ba br4 bw1 pa3 shadow-5'>
                <h1 className='f2 tc black'><span className='shadow-5'>Hints</span></h1>
                <h3 className='underline'>How to grab Image URL</h3>
                <h3 className='mt5'>Computers : </h3>
                <p>1. <b>Search</b> images on Google.</p>
                <p>2. <b>Open</b> the image you want.</p>
                <p>3. Right click on it and choose <b>Copy image address</b>.</p>
                <h3 className='mt5'>Phones : </h3>
                <p>1. <b>Search</b> images on Google.</p>
                <p>2. <b>Open</b> the image you want.</p>
                <p>3. Right click on it and choose <b>Open image in new tap</b>.</p>
                <p>4. <b>Copy</b> the new tap URL.</p>
            </div>
        </div>
    );
}

export default Hints;