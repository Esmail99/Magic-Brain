import React from 'react';
import './InputForm.css';
const InputForm = ({inputOnChange,btnOnClick}) => {
    return(
        <div>
            <p className='f4'>{`This magic brain will detect faces, Give it a try.`}</p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input onChange={inputOnChange} className='f5 pa2 w-70 center ba b--light-purple br3 ma1' type='text' placeholder='Enter an image URL..'></input>
                    <button onClick={btnOnClick} className='w-30 grow f5 link ph3 pv2 dib white bg-light-purple ba b--light-purple br3 ma1'>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default InputForm;