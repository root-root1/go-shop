import Layout from "../components/Layout";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Grid,
    Link,
    Typography,
} from "@material-ui/core";
import Image from 'next/image';
import useStyles from "../utils/styles";
import NextLink from "next/link";
import db from "../utils/db";
import Product from "../models/Product";
import axios from "axios";
import {useContext} from "react";
import {Store} from "../utils/Store";
import {useRouter} from "next/router";

export default function Home({products}) {
    const state = useContext(Store);
    const router = useRouter();
    const classes = useStyles();

    const addToCartHandler = async (product) => {
        const existItem = state.state.cart.cartItems.find(x => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert("Product is Out of Stock");
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
        <Layout>
            <div>
                <h1>Product</h1>
                <Grid container sapcing={3}>
                    {products.map((product, index) => (
                        <Grid item md={4} key={index}>
                            <Card className={classes.card}>
                                <NextLink href={`/product/${product.slug}`} passHref>

                                    <CardActionArea>
                                        <Image
                                            src={product.images}
                                            width={400}
                                            height={400}
                                            alt={product.name}
                                        />
                                        <CardContent>
                                            <Typography>{product.name}</Typography>
                                        </CardContent>
                                    </CardActionArea>

                                </NextLink>
                                <CardActions className={classes.cardFooter}>
                                    <Typography>
                                        Rs {product.price}
                                    </Typography>
                                    <Button
                                        type='button'
                                        size='small'
                                        color='primary'
                                        onClick={() => addToCartHandler(product)}
                                    >
                                        Add To Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    await db.connect();
    const products = await Product.find({}).lean();
    await db.disconnect();
    return {
        props: {
            products: products.map(db.convertDocToDb),
        }
    }
}
