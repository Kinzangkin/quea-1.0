// pages/login.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Contoh validasi sederhana
    if (username === 'admin' && password === 'password') {
      router.push('/admin');
    } else {
      alert('Username atau password salah!');
    }
  };

  return (
    <>
      <Head>
        <title>Login - QUEA</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="background">
        <div className="shape shape1" />
        <div className="shape shape2" />
      </div>

      <form id="login-form" onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log In</button>

        <div className="social">
          <div className="go">
            <i className="fab fa-google" /> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook" /> Facebook
          </div>
        </div>
      </form>

      <style jsx>{`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        body {
          background-color: #080710;
          font-family: 'Poppins', sans-serif;
        }
        .background {
          width: 430px;
          height: 520px;
          position: absolute;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
        }
        .shape {
          height: 200px;
          width: 200px;
          position: absolute;
          border-radius: 50%;
        }
        .shape1 {
          background: linear-gradient(#1845ad, #23a2f6);
          left: -80px;
          top: -80px;
        }
        .shape2 {
          background: linear-gradient(to right, #ff512f, #f09819);
          right: -30px;
          bottom: -80px;
        }
        form {
          height: 520px;
          width: 400px;
          background-color: rgba(255, 255, 255, 0.13);
          position: absolute;
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
          border-radius: 10px;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
          padding: 50px 35px;
        }
        form h3 {
          font-size: 32px;
          font-weight: 500;
          text-align: center;
          color: white;
        }
        label {
          display: block;
          margin-top: 30px;
          font-size: 16px;
          font-weight: 500;
          color: white;
        }
        input {
          display: block;
          height: 50px;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.07);
          border-radius: 3px;
          padding: 0 10px;
          margin-top: 8px;
          font-size: 14px;
          font-weight: 300;
          color: white;
        }
        ::placeholder {
          color: #e5e5e5;
        }
        button {
          margin-top: 50px;
          width: 100%;
          background-color: #ffffff;
          color: #080710;
          padding: 15px 0;
          font-size: 18px;
          font-weight: 600;
          border-radius: 5px;
          cursor: pointer;
        }
        .social {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
        }
        .social div {
          background: rgba(255, 255, 255, 0.27);
          width: 48%;
          border-radius: 3px;
          padding: 10px;
          text-align: center;
          color: white;
          cursor: pointer;
        }
        .social div:hover {
          background-color: rgba(255, 255, 255, 0.47);
        }
      `}</style>
    </>
  );
}
