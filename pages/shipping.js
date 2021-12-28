import {useRouter} from "next/router";
import {useContext, useEffect} from "react";
import {Store} from "../utils/Store";

function Shipping() {
    const router = useRouter();
    const state = useContext(Store);
    const { userInfo } = state.state;
    // useEffect(() => {
    //     if (userInfo) {
    //         router.push('/');
    //     }
    // }, [])
    if (!userInfo){
        router.push('/login?redirect=/shipping');
    }
    return (
        <div>Shipping</div>
    )
}

export default Shipping;
