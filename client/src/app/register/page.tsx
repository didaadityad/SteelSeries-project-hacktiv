'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {toast} from 'react-toastify'

export default function Register(){
const [email,  setEmail] = useState("")
const [password, setPassword] = useState("")
const [username, setUsername] = useState("");
const [name, setName] = useState("");
const router = useRouter();

const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
        const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
            method : 'POST',
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({email, username, name, password})
        })
        if (response.ok) {
            router.push('/login');
            toast.success('Registration successful!');
        } else {
            toast.error('Registration failed!');
        }
    } catch (error) {
        toast.error('An error occurred!');
    }
}
    return (
        <main className="flex min-h-screen justify-center items-center bg-gray-100">
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center bg-white p-10 rounded-lg shadow-lg w-1/3">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">REGISTER</h1>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-4 py-2 bg-gray-200 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-4 py-2 bg-gray-200 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-4 py-2 bg-gray-200 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-4 py-2 bg-gray-200 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button className="rounded-md text-lg bg-gray-700 text-white w-full py-3 mt-4 hover:bg-gray-800 transition-colors">
            Register
        </button>
        <Link href={"/login"} className="text-sm text-gray-500 mt-2 hover:text-gray-700 transition-colors">
            Click here to login
        </Link>
    </form>
</main>
    );

}