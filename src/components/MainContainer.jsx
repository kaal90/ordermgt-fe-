import Grid from '@mui/material/Grid';
import React from 'react';

function MainContainer({ children }) {
    return (
        <Grid container spacing={1}>
            <Grid size={2}></Grid>
            <Grid size={8}>
                {children}
            </Grid>
            <Grid size={2}></Grid>
        </Grid>
    )
}

export default MainContainer;