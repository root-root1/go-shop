import '../styles/globals.css'
import "@emotion/styled";
import {useEffect} from "react";
import {StoreProvider} from "../utils/Store";
import {CssBaseline} from "@material-ui/core";
import {SnackbarProvider} from "notistack";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

function MyApp({Component, pageProps}) {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, [])
    return (
        <SnackbarProvider anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}>
            <StoreProvider>
                <CssBaseline/>
                <PayPalScriptProvider deferLoading={true} options={{ components: 'buttons'}}>
                    <Component {...pageProps} />
                </PayPalScriptProvider>
            </StoreProvider>
        </SnackbarProvider>
    )
}

export default MyApp
