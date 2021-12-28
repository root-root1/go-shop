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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Password Don't match");
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
            Cookies.set("userInfo", data);
            await router.push(redirect || '/');
        } catch (err) {
            console.log(err)
            alert(err.response.data ? err.response.data.message : err.message);
        }
    }

    return (
        <Layout title="Register">
            <form className={classes.form} onSubmit={submitHandler}>
                <Typography component='h1' variant='h1'>
                    Register
                </Typography>
                <List>
                    <ListItem>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id='name'
                            label='Name'
                            inputProps={{type: "text"}}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id='email'
                            label='Email'
                            inputProps={{type: "email"}}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id='password'
                            label='Password'
                            inputProps={{type: "password"}}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id='confirmPassword'
                            label='Confirm Password'
                            inputProps={{type: "password"}}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
