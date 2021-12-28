import '../styles/globals.css'
import "@emotion/styled";
import {useEffect} from "react";
import {StoreProvider} from "../utils/Store";
import {CssBaseline} from "@material-ui/core";
import {SnackbarProvider} from "notistack";

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
                <Component {...pageProps} />
            </StoreProvider>
        </SnackbarProvider>
    )
}

export default MyApp
