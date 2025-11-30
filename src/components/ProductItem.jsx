import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { useState } from 'react';

function ProductItem({ productData, onSelectChange, activeProducts }) {

    const [selected, setSelected] = useState(
        activeProducts.length > 0 && activeProducts.some(item => item.productId === productData.id)
    )

    const handleChange = (e) => {
        const isChecked = e.target.checked;
        setSelected(isChecked);
        onSelectChange(productData.id, isChecked);
    }

    return (
        <Grid container spacing={0} style={{ marginTop: '10px' }}>
            <Grid size={1} style={{ border: '1px solid #559adfff', borderRadius: '10px 0px 0px 10px' }}>
                <Checkbox
                    icon={<CheckCircleOutlineOutlinedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    checked={selected}
                    onChange={handleChange}
                />
            </Grid>
            <Grid container size={11} spacing={0} style={{ backgroundColor: '#559adfff', borderRadius: '0px 10px 10px 0px' }}>
                <Grid size={12} style={{ borderBottom: 'solid 1px white', fontSize: '20px', padding: '5px 10px', fontWeight: 'bold' }}>
                    {productData.productName}
                </Grid>
                <Grid size={12} style={{ fontSize: '17px', padding: '5px 10px', }}>
                    {productData.productDescription}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProductItem;