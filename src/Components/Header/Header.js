import React from 'react';
import './Header.css';

const Header = ({ changeRoute,isSignedin }) =>{
        if(isSignedin){
            return (
                <nav>
                    <p  
                        onClick={() => changeRoute('signin')} 
                        className='f4 link dim white underline pa2 mr2 mr4 pointer'>
                        Sign Out
                    </p>
                </nav>
            );
        }
        else{
            return (
                <nav className='f4 link white underline pa2 mr2 mr4 pointer'>
                    <p
                        onClick={() => changeRoute('register')}
                        className='dim mr3' >
                        Register
                    </p>
                    <p 
                        onClick={() => changeRoute('signin')}
                        className='dim' >
                        Sign In
                    </p>
                </nav>
            );
        }
}


export default Header;