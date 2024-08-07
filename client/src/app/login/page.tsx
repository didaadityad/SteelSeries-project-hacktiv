import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login (){

    const handleLogin = async (formData: FormData) => {
        'use server'
        const email = formData.get('email')
        const password = formData.get('password')

        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })

        if(!result.ok){
            const {message} = await result.json()
            return redirect(`login?error=${message}`)
        }
        const {access_token} = await result.json()
        cookies().set(`Authorization`, `Bearer ${access_token}`)
        return redirect('/')

    }

    return (
        <main className="flex min-h-screen justify-center items-center bg-gray-100">
    <form action={handleLogin} className="flex flex-col gap-6 items-center bg-white p-10 rounded-lg shadow-lg w-1/3">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">LOGIN</h1>
        <input
            type="email"
            placeholder="Email"
            className="pl-4 py-2 bg-gray-200 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            name="email"
        />
        <input
            type="password"
            placeholder="Password"
            className="pl-4 py-2 bg-gray-200 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            name="password"
        />
        <button className="rounded-md text-lg bg-gray-700 text-white w-full py-3 mt-4 hover:bg-gray-800 transition-colors">
            Login
        </button>
        <Link href="/register" className="text-sm text-gray-500 mt-2 hover:text-gray-700 transition-colors">
            Click here to register
        </Link>
    </form>
</main>
    );
}