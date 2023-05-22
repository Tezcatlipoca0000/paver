import Layout from "@/components/layout";
import Link from "next/link";
import Router from "next/router";

export default function admin() {

    /* Handles iron-session login */
    async function handleSubmit(e) {
        e.preventDefault();
        const body = {
            username: e.currentTarget.username.value, 
            pass: e.currentTarget.password.value
        };
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        if (response.ok) {
            return Router.push('/edit')
        } else {
            alert('Información No Valida.');
        }
    }
    
    return (
        <Layout title={'Ingresar admin'}>
            <div className="min-h-screen flex flex-col justify-center items-center">
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Username" required />
                            </div>
                            <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <Link href={'/'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 hover:underline hover:decoration-blue-800 hover:underline-offset-4">
                                &#60;--Regresar
                            </Link>
                            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>    
            </div>
        </Layout>
    )
}
