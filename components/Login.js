import styles from '../styles/Login.module.css'
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { login, logout } from '../reducers/user';
import { useDispatch } from 'react-redux';

function Login() {

	const handleRegister = () => {
		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signUpUsername, password: signUpPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signUpUsername, token: data.token }));
					setSignUpUsername('');
					setSignUpPassword('');
					setIsModalVisible(false)
				}
			});
	};

    const handleConnection = () => {

		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signInUsername, token: data.token }));
					setSignInUsername('');
					setSignInPassword('');
					setIsModalVisible(false)
				}
			});
	};

    useEffect(() =>{
        return () => {console.log("bye bye !")}
    }, [])
    return(
        <div className={styles.container}>
            <Head>
                <title>Hackatweet - Login</title>
            </Head>
            <div className={styles.leftPanel}>
                <Image src= "/hackatweetlogo.png" height={300} width={300} />
            </div>
            <div className={styles.rightPanel}>
                <Image src= "/hackatweetlogo.png" height={50} width={50} />
                <h1>See what's happening</h1>
                <h2>Join Hackatweet today.</h2>
                <button>Sign up</button>
                <p>Akready have an account?</p>
                <button>Sign in</button>
            </div>
        </div>

    );
}

export default Login;