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
import NextLink from "next/link";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {Store} from "../utils/Store";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {useForm, Controller} from "react-hook-form";
import {useSnackbar} from "notistack";

function Login() {
    const classes = useStyles();
    const router = useRouter();
    const {redirect} = router.query;
    const state = useContext(Store);
    const {userInfo} = state.state;
    useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, []);
    const {handleSubmit, control, formState: {errors}} = useForm();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const submitHandler = async ({email, password}) => {
        closeSnackbar();
        try {
            const {data} = await axios.post(`/api/users/login`, {
                email,
                password
            });
            state.dispatch({type: "USER_LOGIN", payload: data});
            Cookies.set("userInfo", JSON.stringify(data));
            await router.push(redirect || '/');
        } catch (err) {
            console.log(err)
            enqueueSnackbar(err.response.data ? err.response.data.message : err.message, {
                variant: 'error'
            });
        }
    }

    return (
        <Layout title="Login">
            <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
                <Typography component='h1' variant='h1'>
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    inputProps={{type: 'email'}}
                                    error={Boolean(errors.email)}
                                    helperText={
                                        errors.email
                                            ? errors.email.type === 'pattern'
                                                ? 'Email is not valid'
                                                : 'Email is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    inputProps={{type: 'password'}}
                                    error={Boolean(errors.password)}
                                    helperText={
                                        errors.password
                                            ? 'Password is required'
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
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Don't have an account? &nbsp; <NextLink href={`/register?redirect=${redirect || '/'}`}
                                                                    passHref>
                            <Link>Register</Link>
                        </NextLink>
                        </Typography>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Login;
