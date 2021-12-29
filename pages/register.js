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
import {useContext, useEffect} from "react";
import {Store} from "../utils/Store";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {Controller, useForm} from "react-hook-form";
import {useSnackbar} from "notistack";

function Register() {
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

    const submitHandler = async ({name, email, password, confirmPassword}) => {
        closeSnackbar();
        if (password !== confirmPassword) {
            enqueueSnackbar("Password Don't match", {variant: "error"});
            return;
        }
        try {
            const {data} = await axios.post(`/api/users/register`, {
                name,
                email,
                password,
                confirmPassword
            });
            state.dispatch({type: "USER_REGISTER", payload: data});
            Cookies.set("userInfo", JSON.stringify(data));
            await router.push(redirect || '/');
        } catch (err) {
            enqueueSnackbar(err.response.data ? err.response.data.message : err.message, {variant: "error"});
        }
    }

    return (
        <Layout title="Register">
            <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
                <Typography component='h1' variant='h1'>
                    Register
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    inputProps={{type: 'text'}}
                                    error={Boolean(errors.name)}
                                    helperText={
                                        errors.name
                                            ? 'Name is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        />
                    </ListItem>
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
                                minLength: 6
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
                                            ? errors.password.type === 'minLength'
                                                ? 'Password must be 6 or more Character long'
                                                : "Password is required"
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    inputProps={{type: 'password'}}
                                    error={Boolean(errors.password)}
                                    helperText={
                                        errors.password
                                            ? errors.password.type === 'minLength'
                                                ? 'Password must be 6 or more Character long'
                                                : "Password is required"
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
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Already have an account? <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
                            <Link>Login</Link>
                        </NextLink>
                        </Typography>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}

export default Register;
