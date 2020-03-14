import React from 'react';
import './InputImage.css';

const InputImage = ({imageURL,box}) =>{
    return(
        <div className='center'>
            <div className='absolute ma3'>
                <img id='inputImg' src={ imageURL } alt='' width='400vw'></img>
                <div className='bounding-box' style={{top:box.top , right:box.right , bottom:box.bottom , left:box.left}}></div>
            </div>
        </div>
    );
}

export default InputImage;