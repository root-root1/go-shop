import {useContext, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {Store} from "../utils/Store";
import Layout from "../components/Layout";
import Cookies from "js-cookie";
import {
    Button, Card, CircularProgress,
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
import useStyles from "../utils/styles";
import CheckoutWizard from "../components/CheckoutWizard";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";
import {getError} from "../utils/error";
import axios from "axios";

function PlaceOrder() {
    const router = useRouter();
    const state = useContext(Store);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const {userInfo, cart: {cartItems, shippingAddress, paymentMethod}} = state.state;
    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment');
        }
        if (cartItems.length === 0){
            router.push('/');
        }
    }, [])
    const classes = useStyles();

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
    const itemPrice = round2(cartItems.reduce((a, c) => a + c.price * c.quantity, 0));
    const shippingPrice = itemPrice > 3000 ? 0 : 50;
    const gstPrice = round2(itemPrice * 0.18);
    const totalPrice = round2(itemPrice + shippingPrice + gstPrice);

    const placeOrderHandler = async () => {
        closeSnackbar();
        try {
            setLoading(true);
            const {data} = await axios.post("/api/orders", {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                shippingPrice,
                itemPrice,
                gstPrice,
                totalPrice
            }, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`
                }
            });
            state.dispatch({type: "CART_CLEAR"});
            Cookies.remove("cartItems");
            setLoading(false);
            router.push(`/order/${data._id}`);
        } catch (err) {
            setLoading(false);
            enqueueSnackbar(getError(err), {variant: "error"});
        }
    }

    return (
        <Layout title="Place Order">
            <CheckoutWizard activeStep={3}/>
            <Typography component='h1' variant='h1'>
                Place Order
            </Typography>
            <Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component='h2' variant='h2'>Shipping Address</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>
                                    {shippingAddress.fullName}, {shippingAddress.address}, {' '}
                                    {shippingAddress.city}, {shippingAddress.postalCode}, {' '}
                                    {shippingAddress.country}
                                </Typography>
                            </ListItem>
                        </List>
                    </Card>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component='h2' variant='h2'>Payment Method</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>
                                    {paymentMethod}
                                </Typography>
                            </ListItem>
                        </List>
                    </Card>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography component='h2' variant='h2'>Order Items</Typography>
                            </ListItem>
                            <ListItem>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Image</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell align='right'>Quantity</TableCell>
                                                <TableCell align='right'>Price</TableCell>
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
                                                            <Typography>{item.quantity}</Typography>
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            <Typography>
                                                                Rs {item.price}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card className={classes.section}>
                        <List>
                            <ListItem>
                                <Typography variant='h2'>
                                    Order Summary
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Item</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='right'>Rs {itemPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>GST</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='right'>Rs {gstPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Shipping</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='right'>Rs {shippingPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography><strong>Total</strong></Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align='right'><strong>Rs {totalPrice}</strong></Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    fullWidth
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListItem>
                            {loading && (
                                <ListItem>
                                    <CircularProgress/>
                                </ListItem>
                            )}
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(PlaceOrder), {ssr: false});
