import Layout from "../../components/Layout";
import NextLink from "next/link";
import {
    Button,
    Card,
    Grid,
    Link, List, ListItem, Typography
} from "@material-ui/core";
import useStyles from "../../utils/styles";
import Image from 'next/image';
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import {useContext} from "react";
import {Store} from "../../utils/Store";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";

const ProductScreen = ({product}) => {
    const classes = useStyles();
    const router = useRouter();
    const state = useContext(Store);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    if (!product) {
        return <div>Product not Found</div>
    }

    const addToCartHandler = async () => {
        closeSnackbar();
        const existItem = state.state.cart.cartItems.find(x => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`/api/products/${product._id}`);

        if (data.countInStock < quantity) {
            enqueueSnackbar("Product is Out of Stock", {variant: "warning"});
            return;
        }
        state.dispatch({
            type: "CART_ADD_ITEM", payload: {
                ...product, quantity: quantity,
            }
        });
        router.push('/cart');
    }

    return (
        <Layout title={product.name} descriptions={product.descriptions}>
            <div className={classes.section}>
                <NextLink href='/' passHref>
                    <Link>
                        <Typography>Back To Home</Typography>
                    </Link>
                </NextLink>
            </div>
            <Grid container sapcing={1}>
                <Grid item md={6} xs={12}>
                    <Image
                        src={product.images}
                        alt={product.name}
                        width={650}
                        height={650}
                        layout='responsive'
                    />
                </Grid>
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem>
                            <Typography component='h1' variant='h1'>{product.name}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Category - {product.category}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Brand - {product.brand}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Rating - {product.rating} stars ({product.numreview} Review)</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Description - {product.descriptions}</Typography>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Price</Typography>
                                    </Grid>
                                    <Grid item xs={6}><Typography>Rs {product.price}</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Status</Typography>
                                    </Grid>
                                    <Grid item
                                          xs={6}><Typography> {product.countInStock > 0 ? "In Stock" : "Out Of Stock"} </Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    onClick={addToCartHandler}
                                >
                                    Add To Cart
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const {slug} = ctx.params;
    await db.connect();
    const product = await Product.findOne({slug}).lean();
    await db.disconnect();
    return {
        props: {
            product: db.convertDocToDb(product),
        }
    }
}


export default ProductScreen;
