import React from 'react';
import './Navigation.css'

const Navigation = ({onRouteChange, route}) => {
        if(route === 'home'){
            return(
            <nav id='signedInNav' style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'> Detect </p>
                <p onClick={() => onRouteChange('leaderboard')} className='f3 link dim black underline pa3 pointer'> Leaderboard </p>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'> Sign Out </p>
            </nav>
            )
        } else if (route === 'leaderboard'){
            return(
                <nav id='signedOutNav' style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'> Detect </p>
                    <p onClick={() => onRouteChange('leaderboard')} className='f3 link dim black underline pa3 pointer'> LeaderBoard </p>
                    <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'> Sign Out </p>
                </nav>);
        } else {
            return(
            <nav id='signedOutNav' style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'> Sign in </p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'> Register </p>
            </nav>
            );
        }
        
}

export default Navigation;