import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('Email:', email);
    // console.log('Password:', password);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="w-full max-w-sm bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Log In
        </button>
      </form>
      <br />
      <hr />
      <br />
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-md">
        <NavLink
          to="/register"
          className="text-white font-semibold text-lg hover:opacity-75 transition duration-300"
        >
          <button
            className="w-full bg-green-500 text-blue p-2 rounded hover:bg-green-600"
            type="button"
          >
            Register
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default LoginForm;
