import React from 'react';
import MainContainer from '../components/MainContainer';

function NotFound() {
    return (
        <MainContainer>
            <p style={{ textAlign: 'center', fontSize: '170px', color: 'darkred' }}><b>404</b></p>
            <p style={{ textAlign: 'center', fontSize: '40px', marginTop: '-150px' }}>PAGE NOT FOUND</p>
        </MainContainer>
    )
}

export default NotFound;