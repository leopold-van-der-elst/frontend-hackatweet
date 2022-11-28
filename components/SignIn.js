import styles from '../styles/SignIn.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';



function SignIn() {
	const dispatch = useDispatch();
	const router = useRouter();
    
    const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

    const handleConnection = () => {
	
		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: data.user.username, token: data.user.token, id: data.user.id }));
					console.log(data.user)
					router.push('/home');
					console.log(data.user)
				}
			});
	};

    return(
        <div className={styles.signInContainer}>
			<Image src= "/hackatweetlogo.png" height={40} width={50} />
			<h3 className={styles.accountText}>Connect to Hackatweet</h3>
			<div className={styles.inputsContainer}>
				<input className={styles.input} type="text" placeh lder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
				<input className={styles.input} type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
			</div>
			<button className={styles.signInButton} id="connection" onClick={() => handleConnection()}>Sign in</button>
        </div>

    )
}

export default SignIn;