// src/pages/Orders.jsx
import React, { useEffect, useState } from 'react';
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
import { getOrders, createOrder, updateOrder, deleteOrder } from "../services/orderService";
import { getProducts } from "../services/productService";
import Tooltip from '@mui/material/Tooltip';
import { format } from "date-fns";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';

function Orders() {
    const [productData, setProductData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [openNewOrder, setOpenNewOrder] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openDiscardDialog, setOpenDiscardDialog] = useState(false);
    const [dialogType, setDialogType] = useState();
    const [activeEdit, setActiveEdit] = useState(0);
    const [activeDelete, setActiveDelete] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderDescription, setOrderDescription] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [orderSeverity, setOrderSeverity] = useState('');
    const [openOrderAlert, setOpenOrderAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [activeProducts, setActiveProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadOrders();
    }, [page, limit, loading]);

    useEffect(() => {
        loadProducts();
    }, [loading]);

    const loadOrders = async () => {
        try {
            const res = await getOrders(page, limit);
            setOrderData(res.data);
            setTotalPages(res.totalPages)
        } catch (error) {
            console.error('Error loading orders', error);
        }
    };

    const handleFilterByIdOrDescription = async (e) => {

        try {
            const res = await getOrders(page, limit, e.target.value);
            setOrderData(res.data);
            setTotalPages(res.totalPages)
        } catch (error) {
            console.error('Error loading orders', error);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenOrderAlert(false);
    };

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProductData(data);
        } catch (error) {
            console.error('Error loading products', error);
        }
    };

    const handleSelectChange = (id, isSelected) => {
        setSelectedProducts(prev => {
            if (isSelected) {
                return [...prev, id];
            } else {
                return prev.filter(pid => pid !== id);
            }
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value));
        setPage(1);
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

    const handleOrderDescription = (event) => {
        setOrderDescription(event.target.value);
    }

    const handleOpenEditDialog = (row) => {
        setActiveEdit(row.id);
        setOrderDescription(row.orderDescription);
        setActiveProducts(row.OrderProductMaps);
        setOpenEditDialog(true);
    }

    const handleDeleteOrder = (row) => {
        setActiveDelete(row.id);
        setOpenDeleteDialog(true);
    }

    const submitNewOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            orderDescription,
            productIds: selectedProducts
        }
        try {
            const newOrder = await createOrder(data);
            console.log('Order Created', newOrder)
            setOpenOrderAlert(true);
            setOrderSeverity('success');
            setAlertMessage('Order Successfully Created')
            setOpenNewOrder(false);
            setOrderDescription('');
            setSelectedProducts([]);
        } catch (error) {
            console.error('Error creating order', error);
            setOpenOrderAlert(true);
            setOrderSeverity('error');
            setAlertMessage('Order Creation Error')
        }
        setLoading(false);
    }

    const submitEditOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            orderDescription,
            productIds: selectedProducts
        }
        try {
            const newOrder = await updateOrder(activeEdit, data);
            console.log('Order updated', newOrder)
            setOpenOrderAlert(true);
            setOrderSeverity('success');
            setAlertMessage('Order Successfully Updated')
            setOpenEditDialog(false);
            setOrderDescription('');
            setSelectedProducts([]);
        } catch (error) {
            console.error('Error updating order', error);
            setOpenOrderAlert(true);
            setOrderSeverity('error');
            setAlertMessage('Order Updating Error')
        }
        setLoading(false);
    }

    const submitDeleteOrder = async () => {
        setLoading(true);
        try {
            const delOrder = await deleteOrder(activeDelete);
            console.log('Order Deleted', delOrder)
            setOpenOrderAlert(true);
            setOrderSeverity('success');
            setAlertMessage('Order Successfully Deleted!')
            setOpenDeleteDialog(false);
            setActiveDelete(null);
            setLoading(false);
        } catch (error) {
            console.error('Error deleting order', error);
            setOpenOrderAlert(true);
            setOrderSeverity('error');
            setAlertMessage('Order Deleting Error!')
            setActiveDelete(null);
        }
        setLoading(false);
    }


    return (
        <MainContainer>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1>Order Management</h1>
            </div>
            <Tooltip title="Search by order Id or Order Description only">
                <TextField
                    id="filter_table"
                    label="Search By Order Description or ID"
                    variant="outlined"
                    style={{ width: '100%', marginBottom: '10px' }}
                    size="small"
                    onChange={handleFilterByIdOrDescription}
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
            </Tooltip>
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
                        {orderData.map((row, idx) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">{row.orderDescription}</TableCell>
                                <TableCell align="right">{row.OrderProductMaps.length}</TableCell>
                                <TableCell align="right">{format(new Date(row.createdAt), "yyyy-MM-dd")}</TableCell>
                                <TableCell align="right">
                                    <Grid container>
                                        <Grid size={6}>
                                            <Tooltip title="Edit Order">
                                                <IconButton aria-label="edit">
                                                    <EditIcon onClick={() => handleOpenEditDialog(row)} />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid size={6}>
                                            <Tooltip title="Delete Order">
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon onClick={() => handleDeleteOrder(row)} />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    count={totalPages * limit}
                    rowsPerPage={limit}
                    page={page - 1}
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
                <form onSubmit={submitNewOrder}>
                    <DialogContent>
                        <Tooltip title="Enter a brief description for your order">
                            <TextField
                                id="outlined-basic"
                                label="Order Description"
                                variant="outlined"
                                style={{ width: '100%', marginTop: '10px' }}
                                size="small"
                                onChange={handleOrderDescription}
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
                        </Tooltip>
                        {productData.map((pd) => (
                            <ProductItem key={pd.id} productData={pd} onSelectChange={handleSelectChange} activeProducts={[]} />
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
                            type="submit"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Edit Order Dialog */}
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={openEditDialog}
            >
                <DialogTitle style={{ textAlign: 'center', padding: '0px' }}><h2>Edit Order</h2></DialogTitle>
                <form onSubmit={submitEditOrder}>
                    <DialogContent>
                        <Tooltip title="Enter a brief description for your order">
                            <TextField
                                id="outlined-basic"
                                label="Order Description"
                                variant="outlined"
                                style={{ width: '100%', marginTop: '10px' }}
                                size="small"
                                value={orderDescription}
                                onChange={handleOrderDescription}
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
                        </Tooltip>
                        {productData.map((pd) => (
                            <ProductItem key={pd.id} productData={pd} onSelectChange={handleSelectChange} activeProducts={activeProducts} />
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
                            type='submit'
                        >
                            Save
                        </Button>
                    </DialogActions>
                </form>
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

            <Snackbar
                open={openOrderAlert}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert icon={orderSeverity === 'success' ? <CheckIcon /> : <CloseIcon />} severity={orderSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </MainContainer>
    );
}

export default Orders;
