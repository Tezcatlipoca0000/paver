import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";

export default function edit() {

    const router = useRouter();

    useEffect(()=>{
        const login = router.query.access;
        if (!login) {
            router.push('/');
        }
    }, [router.query]);

    return (
        <Layout title={'Administrar Pa-Ver'}>
            <h1>Hello</h1>
        </Layout>
    )
}
