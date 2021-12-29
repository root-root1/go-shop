import {
    useContext,
    useEffect,
    useState
} from "react";
import {Store} from "../utils/Store";
import {useRouter} from "next/router";
import Cookies from 'js-cookie';
import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import useStyles from "../utils/styles";
import {
    Button,
    FormControl,
    FormControlLabel,
    List,
    ListItem,
    Radio,
    RadioGroup,
    Typography
} from "@material-ui/core";
import {useSnackbar} from "notistack";

function Payment() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [paymentMethod, setPaymentMethod] = useState();
    const classes = useStyles();
    const router = useRouter();
    const state = useContext(Store);
    const {cart: {shippingAddress}} = state.state

    useEffect(() => {
        if (!shippingAddress.address) {
            router.push('/shipping')
        } else {
            setPaymentMethod(Cookies.get('paymentMethod') || '');
        }
    }, [router, shippingAddress.address, paymentMethod]);
    const submitHandler = (e) => {
        closeSnackbar();
        e.preventDefault();
        if (!paymentMethod){
            enqueueSnackbar("Select a Payment Method First", { variant: 'error'});
        }else{
            state.dispatch({type: "SAVE_PAYMENT_METHOD", payload: paymentMethod});
            Cookies.set("paymentMethod", JSON.stringify(paymentMethod));
            router.push('/placeOrder')
        }
    }
    return (
        <Layout title="Payment Method">
            <CheckoutWizard activeStep={2}/>
            <form className={classes.form} onSubmit={submitHandler}>
                <Typography component='h1' variant='h1'>Payment Method</Typography>
                <List>
                    <ListItem>
                        <FormControl component='fieldset'>
                            <RadioGroup
                                aria-label="Payment Method"
                                name='paymentMethod'
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel control={<Radio/>} label='PayPal' value='PayPal'/>
                                <FormControlLabel control={<Radio/>} label='Stripe' value='Stripe'/>
                                <FormControlLabel control={<Radio/>} label='Cash' value='Cash'/>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type='submit' variant='contained' color="primary">
                            Continue
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type='submit' variant='contained' onClick={() => router.push('/shipping')}>
                            Back
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Payment;
