import {useContext} from "react";
import dynamic from "next/dynamic";
import {Store} from "../utils/Store";
import Layout from "../components/Layout";
import {
    Button, Card,
    Grid,
    Link, List, ListItem, MenuItem, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import Image from 'next/image';
import NextLink from "next/link";
import axios from "axios";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";

function CartScreen() {
    const state = useContext(Store);
    const router = useRouter();
    const {cart: {cartItems}} = state.state;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const updateCartHandler = async (item, quantity) => {
        closeSnackbar()
        const {data} = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity){
            enqueueSnackbar("Product is Out of Stock", {variant: "warning"});
            return;
        }
        state.dispatch({
            type: "CART_ADD_ITEM", payload: {
                ...item, quantity: quantity,
            }
        });
    };
    const removeItemHandler = (item) => {
        state.dispatch({type: "CART_REMOVE_ITEM", payload: item});
    }
    const checkOutHandler = () => {
        router.push('/shipping')
    }
    return (
        <Layout title='Shopping Cart'>
            <Typography component='h1' variant='h1'>
                Shopping Cart
            </Typography>
            {
                cartItems.length === 0
                    ? (
                        <div>
                            Cart is Empty <NextLink href='/' passHref>
                                <Link>Go Shop</Link>
                            </NextLink>
                        </div>
                    ) :
                    (
                        <Grid container spacing={1}>
                            <Grid item md={9} xs={12}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Image</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell align='right'>Quantity</TableCell>
                                                <TableCell align='right'>Price</TableCell>
                                                <TableCell align='right'>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                cartItems.map((item) => (
                                                    <TableRow key={item._id}>
                                                        <TableCell>
                                                            <NextLink href={`/product/${item.slug}`} passHref>
                                                                <Link>
                                                                    <Image
                                                                        src={item.images}
                                                                        alt={item.name}
                                                                        width={50}
                                                                        height={50}
                                                                    />
                                                                </Link>
                                                            </NextLink>
                                                        </TableCell>
                                                        <TableCell>
                                                            <NextLink href={`/product/${item.slug}`} passHref>
                                                                <Link>
                                                                    <Typography>{item.name}</Typography>
                                                                </Link>
                                                            </NextLink>
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            <Select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                                                                {[...Array(item.countInStock).keys()].map(x => (
                                                                    <MenuItem key={x + 1}
                                                                              value={x + 1}>{x + 1}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            Rs {item.price}
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            <Button color='secondary' variant='contained' onClick={() => removeItemHandler(item)}>X</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <Card>
                                    <List>
                                        <ListItem>
                                            <Typography variant='h2'>
                                                SubTotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} {" "} Items )
                                                : {" "} Rs {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Button
                                                color='primary'
                                                variant='contained'
                                                fullWidth
                                                onClick={checkOutHandler}
                                            >
                                                Check Out
                                            </Button>
                                        </ListItem>
                                    </List>
                                </Card>
                            </Grid>
                        </Grid>
                    )
            }
        </Layout>
    )
}

export default dynamic(()=> Promise.resolve(CartScreen), {ssr: false});
