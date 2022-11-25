import styles from '../styles/Login.module.css'
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { login, logout } from '../reducers/user';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import SignUp from './SignUp';
import SignIn from './SignIn';

function Login() {

	const [modalRegisterOpen, setModalRegisterOpen] = useState(false);
	const [modalSignInOpen, setModalSignInOpen] = useState(false);

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
                <div className={styles.textContainer}>
                    <h1>See what's happening</h1>
                    <h2>Join Hackatweet today.</h2>
                </div>
                <div className={styles.visitorSection}>
                <button onClick={() => setModalRegisterOpen(true)}>Sign up</button>
					<Modal className={styles.modal} open={modalRegisterOpen}>
						<SignUp />
					</Modal>
                <p>Already have an account?</p>
                <button onClick={() => setModalSignInOpen(true)}>Sign in</button>
					<Modal className={styles.modal} open={modalSignInOpen}>
						<SignIn />
					</Modal>
                </div>
            </div>
        </div>

    );
}

export default Login;