import {useRouter} from "next/router";
import {useEffect} from "react";


export default function error() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/');
    }, []);

    return null;
}