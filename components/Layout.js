import Head from "next/head";
import {
    AppBar, Badge, Button,
    Container,
    createTheme,
    CssBaseline,
    Link, Menu, MenuItem,
    MuiThemeProvider,
    Switch,
    Toolbar,
    Typography
} from "@material-ui/core";
import useStyles from "../utils/styles";
import NextLink from 'next/link';
import {useContext, useState} from "react";
import Cookies from 'js-cookie';
import {Store} from "../utils/Store";
import {useRouter} from "next/router";

const Layout = ({children, title, descriptions}) => {
    const router = useRouter();
    const state = useContext(Store);
    const {darkMode, cart, userInfo} = state.state;
    const [anchorEl, setAnchorEl] = useState(null);

    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: "1rem 0"
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: "1rem 0"
            }
        },
        palette: {
            type: darkMode ? "dark" : 'light',
            primary: {
                main: '#f0c000'
            },
            secondary: {
                main: "#208080"
            },
        },
    });
    const classes = useStyles();
    const onDarkModeChangeHandler = () => {
        // console.log("handler ", darkMode)
        state.dispatch({
            type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON"
        });
        const newDarkMode = !darkMode;
        Cookies.set("darkMode", JSON.stringify(newDarkMode ? "ON" : "OFF"));
    }
    const profileClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const profileCloseHandler = (e) => {
        setAnchorEl(null);
    }
    const logoutHandler = (e) => {
        setAnchorEl(null);
        state.dispatch({ type: "USER_LOGOUT" });
        Cookies.remove("userInfo");
        Cookies.remove("cartItem");
        router.push('/');
    }
    return (
        <div>
            <Head>
                <title>{title ? `${title} ~ Go Shop` : "Go Shop"}</title>
                {descriptions && <meta name='description' content={descriptions}/>}
            </Head>
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position='static' className={classes.navbar}>
                    <Toolbar>

                        <NextLink href='/' passHref>
                            <Link>
                                <Typography className={classes.brand}>
                                    Go Shop
                                </Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow}/>
                        <div>
                            <Switch checked={state.state.darkMode} onClick={onDarkModeChangeHandler}/>
                            <NextLink href='/cart' passHref>
                                <Link className={classes.link}>
                                    {cart.cartItems.length > 0
                                        ? <Badge color='secondary' badgeContent={cart.cartItems.length}>Cart</Badge>
                                        : "Cart"}
                                </Link>
                            </NextLink>

                            {userInfo ?
                                (
                                    <>
                                        <Button
                                            className={classes.navbarButton}
                                            id="demo-positioned-button"
                                            aria-controls="demo-positioned-menu"
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={profileClickHandler}
                                        >
                                            {userInfo.name}
                                        </Button>
                                        <Menu
                                            id="demo-positioned-menu"
                                            aria-labelledby="demo-positioned-button"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={profileCloseHandler}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <MenuItem onClick={profileCloseHandler}>Profile</MenuItem>
                                            <MenuItem onClick={profileCloseHandler}>My account</MenuItem>
                                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                                        </Menu>
                                    </>
                                )

                                : <NextLink href='/login' passHref>
                                    <Link className={classes.link}>
                                        Login
                                    </Link>
                                </NextLink>
                            }

                        </div>
                    </Toolbar>
                </AppBar>
                <Container className={classes.main}>
                    {children}
                </Container>
                <footer className={classes.footer}>
                    <Typography>
                        All Right Reserved. Go Shop
                    </Typography>
                </footer>
            </MuiThemeProvider>
        </div>
    )
}

export default Layout;