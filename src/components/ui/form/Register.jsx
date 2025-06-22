'use client';
import { signup } from '@/libs/auth';
import { useActionState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [state, action, pending] = useActionState(signup, undefined);

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <form
                action={action}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
                autoComplete="off"
            >
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">Register</h2>

                <div>
                    <label htmlFor='name' className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <FaUser />
                        </span>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="off"
                            className={`pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${state?.errors?.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Your name"
                        />
                    </div>
                    {state?.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>}
                </div>

                <div>
                    <label htmlFor='email' className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <FaEnvelope />
                        </span>
                        <input
                            id="email"
                            name="email"
                            type='email'
                            autoComplete="off"
                            className={`pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${state?.errors?.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="you@email.com"
                        />
                    </div>
                    {state?.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>}
                </div>
                
                <div>
                    <label htmlFor='password' className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <FaLock />
                        </span>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            className={`pl-10 pr-10 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${state?.errors?.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Password"
                        />
                        <span
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={0}
                            role="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') setShowPassword(prev => !prev);
                            }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {state?.errors?.password && <div className="text-red-500 text-xs mt-1">
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                                <li key={error} className="list-disc ml-5">- {error}</li>
                            ))}
                        </ul>
                    </div>}
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
                >
                    Register
                </button>

                {state?.message && (
                    <p
                        className={`text-xs text-center mt-2 ${
                            state.success
                                ? 'text-green-500'
                                : 'text-red-500'
                        }`}
                    >
                        {state.message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Register;