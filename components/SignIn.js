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
            <input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
			<input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
			<button id="connection" onClick={() => handleConnection()}>Connect</button>
        </div>

    )
}

export default SignIn;