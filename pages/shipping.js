import Layout from "../components/Layout";
import {
    Button,
    List,
    ListItem,
    TextField,
    Typography,
    Link
} from "@material-ui/core";
import useStyles from "../utils/styles";
import {useContext, useEffect} from "react";
import {Store} from "../utils/Store";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {Controller, useForm} from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";

function Register() {
    const classes = useStyles();
    const router = useRouter();
    const state = useContext(Store);
    const {userInfo, cart: {shippingAddress}} = state.state;
    const {handleSubmit, control, formState: {errors}, setValue } = useForm();
    useEffect(() => {
        if (!userInfo) {
            router.push('/login?redirect=/shipping');
        }
        setValue("fullName", shippingAddress.fullName);
        setValue("address", shippingAddress.address);
        setValue("city", shippingAddress.city);
        setValue("postalCode", shippingAddress.postalCode);
        setValue("country", shippingAddress.country);
    }, []);

    const submitHandler = async ({fullName, address, city, postalCode, country}) => {
        state.dispatch({type: "SAVE_SHIPPING_ADDRESS", payload: {fullName, address, city, postalCode, country}});
        Cookies.set("shippingAddress", JSON.stringify({fullName, address, city, postalCode, country}));
        router.push('/payment');
    }

    return (
        <Layout title="Shipping Address">
            <CheckoutWizard activeStep={1} />
            <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
                <Typography component='h1' variant='h1'>
                    Shipping
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name="fullName"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    inputProps={{type: 'text'}}
                                    error={Boolean(errors.fullName)}
                                    helperText={
                                        errors.fullName
                                            ? 'Full Name is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    inputProps={{type: 'text'}}
                                    error={Boolean(errors.address)}
                                    helperText={
                                        errors.address
                                            ? 'Address is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="city"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="city"
                                    label="City"
                                    inputProps={{type: 'text'}}
                                    error={Boolean(errors.city)}
                                    helperText={
                                        errors.city
                                            ? 'City Name is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="postalCode"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="postalCode"
                                    label="Postal Code"
                                    inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                    error={Boolean(errors.postalCode)}
                                    helperText={
                                        errors.postalCode
                                            ? errors.postalCode.type === 'pattern'
                                                ? "Postal Code Must be Numeric"
                                                : 'Postal Code is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        />
                    </ListItem><ListItem>
                        <Controller
                            name="country"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="country"
                                    label="Country"
                                    inputProps={{type: 'text'}}
                                    error={Boolean(errors.country)}
                                    helperText={
                                        errors.country
                                            ? 'Country is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                        >
                            Continue
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Register;
