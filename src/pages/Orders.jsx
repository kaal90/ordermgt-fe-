// src/pages/Orders.jsx
import React, { useState } from 'react';
import MainContainer from '../components/MainContainer';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import ProductItem from '../components/ProductItem';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function Orders() {
    const [tableData] = useState([
        { id: 1, orderDescription: 'aa', productCount: 2, createdDate: '2141' },
        { id: 2, orderDescription: 'aaa', productCount: 3, createdDate: '870' },
        { id: 3, orderDescription: 'aga', productCount: 5, createdDate: '568' },
        { id: 4, orderDescription: 'bbb', productCount: 1, createdDate: '123' },
        { id: 5, orderDescription: 'ccc', productCount: 4, createdDate: '456' },
        { id: 6, orderDescription: 'ddd', productCount: 2, createdDate: '789' },
        { id: 7, orderDescription: 'eee', productCount: 6, createdDate: '101' },
        { id: 8, orderDescription: 'fff', productCount: 3, createdDate: '202' },
        { id: 9, orderDescription: 'ggg', productCount: 2, createdDate: '303' },
        { id: 10, orderDescription: 'hhh', productCount: 5, createdDate: '404' },
    ]);
    const [productData] = useState([
        { productName: 'MABA', productDescription: 'jhjhsdajhsdgkjs' },
        { productName: 'MABA2', productDescription: 'jhjhsdajhsdgkjs2' },
        { productName: 'MABA3', productDescription: 'jhjhsdajhsdgkjs3' },
        { productName: 'MABA4', productDescription: 'jhjhsdajhsdgkjs4' },
        { productName: 'MABA5', productDescription: 'jhjhsdajhsdgkjs5' },
        { productName: 'MABA6', productDescription: 'jhjhsdajhsdgkjs6' },
        { productName: 'MABA7', productDescription: 'jhjhsdajhsdgkjs7' },
        { productName: 'MABA8', productDescription: 'jhjhsdajhsdgkjs8' },
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openNewOrder, setOpenNewOrder] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openDiscardDialog, setOpenDiscardDialog] = useState(false);
    const [dialogType, setDialogType] = useState();
    const [activeEdit, setActiveEdit] = useState(0);
    const [activeDelete, setActiveDelete] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleNewOrderCancel = () => {
        setDialogType('new');
        setOpenDiscardDialog(true);
    }

    const handleEditCancel = () => {
        setDialogType('edit');
        setOpenDiscardDialog(true);
    }

    const handleCancelDialog = () => {
        if (dialogType === 'edit') {
            setOpenDiscardDialog(false);
            setOpenEditDialog(false);
        } else if (dialogType === 'new') {
            setOpenDiscardDialog(false);
            setOpenNewOrder(false);
        }
    }

    const handleOpenEditDialog = (idx) => {
        setActiveEdit(idx);
        setOpenEditDialog(true);
    }

    const handleDeleteOrder = (idx) => {
        setActiveDelete(tableData[idx].id);
        setOpenDeleteDialog(true);
    }

    const submitNewOrder = () => {
        console.log('ORDER ADDED SUCCESSFULLY');
        setOpenNewOrder(false);
    }

    const submitEditOrder = () => {
        console.log('ORDER CHANGED SUCCESSFULLY');
        setOpenEditDialog(false);
    }

    const submitDeleteOrder = () => {
        console.log('ORDER DELETED SUCCESSFULLY');
        setOpenDeleteDialog(false);
    }


    return (
        <MainContainer>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1>Order Management</h1>
            </div>
            <TextField
                id="outlined-basic"
                label="Search By Order Description or ID"
                variant="outlined"
                style={{ width: '100%', marginBottom: '10px' }}
                size="small"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <TableContainer component={Paper} style={{ marginBottom: '10px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="orders table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Id</TableCell>
                            <TableCell align="right">Order Description</TableCell>
                            <TableCell align="right">Count of Products</TableCell>
                            <TableCell align="right">Created Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tableData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, idx) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell align="right">{row.orderDescription}</TableCell>
                                    <TableCell align="right">{row.productCount}</TableCell>
                                    <TableCell align="right">{row.createdDate}</TableCell>
                                    <TableCell align="right">
                                        <Grid container>
                                            <Grid size={6}>
                                                <IconButton aria-label="edit">
                                                    <EditIcon onClick={() => handleOpenEditDialog(idx)} />
                                                </IconButton>
                                            </Grid>
                                            <Grid size={6}>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon onClick={() => handleDeleteOrder(idx)} />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Button
                variant="contained"
                size="large"
                onClick={() => setOpenNewOrder(true)}
            >
                New Order
            </Button>

            {/* New Order Dialog */}
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={openNewOrder}
            >
                <DialogTitle style={{ textAlign: 'center', padding: '0px' }}><h2>New Order</h2></DialogTitle>
                <DialogContent>
                    <TextField
                        id="outlined-basic"
                        label="Order Description"
                        variant="outlined"
                        style={{ width: '100%', marginTop: '10px' }}
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {productData.map((pd) => (
                        <ProductItem key={pd.id} productData={pd} />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        size="large"
                        color="error"
                        onClick={() => handleNewOrderCancel()}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="success"
                        onClick={() => submitNewOrder()}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Order Dialog */}
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={openEditDialog}
            >
                <DialogTitle style={{ textAlign: 'center', padding: '0px' }}><h2>Edit Order</h2></DialogTitle>
                <DialogContent>
                    <TextField
                        id="outlined-basic"
                        label="Order Description"
                        variant="outlined"
                        style={{ width: '100%', marginTop: '10px' }}
                        size="small"
                        value={tableData[activeEdit].orderDescription}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {productData.map((pd) => (
                        <ProductItem key={pd.id} productData={pd} />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        size="large"
                        color="error"
                        onClick={() => handleEditCancel()}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="success"
                        onClick={() => submitEditOrder()}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog
                open={openDeleteDialog}
            >
                <DialogContent>
                    <p style={{ fontSize: '20px' }}>Are you sure you want to <b>Permanantly delete</b> this order?</p>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        size="large"
                        color="error"
                        onClick={() => submitDeleteOrder()}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="success"
                        onClick={() => setOpenDeleteDialog(false)}
                        autoFocus
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Discard Dialog */}
            <Dialog
                open={openDiscardDialog}
            >
                <DialogContent>
                    <p style={{ fontSize: '20px' }}>Are you sure you want to discard changes?</p>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        size="large"
                        color="error"
                        onClick={() => handleCancelDialog()}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="success"
                        autoFocus
                        onClick={() => setOpenDiscardDialog(false)}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </MainContainer>
    );
}

export default Orders;
