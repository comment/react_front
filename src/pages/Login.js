import React, { useState } from 'react';
import { baseUrl } from "../shared";

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function login(e) {
        e.preventDefault();

        const url = baseUrl + 'api/token/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                    username: username,
                    password: password
                }
            )
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                localStorage.setItem('access', data.access)
                localStorage.setItem('refresh', data.refresh)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }

    return (
        <div>
            <form
                className="w-full max-w-sm"
                id="customer"
                onSubmit={login}
            >
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor="username">Login</label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="password"
                            type="text"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit">Login
                </button>
            </form>
        </div>
    );
};

export default Login;