import styles from '../styles/SignUp.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import Image from 'next/image';
import Link from 'next/link';
import Home from '../components/Home';
import { useRouter } from 'next/router';


function SignUp() {
    const [signUpFirstname, setSignFirstname] = useState('');
	const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');

    const dispatch = useDispatch();
    const router = useRouter();
    
    const handleRegister = () => {
        

		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signUpUsername, token: data.token }));
                    router.push('/home');
				}
			});
	};

    return(
      <div className={styles.registerContainer}>
        <Image src= "/hackatweetlogo.png" height={50} width={50} />
            <h3>Create your Hackatweet account</h3>
            <input type="text" className={styles.input} placeholder="Firstname" id="signUpFirstname" onChange={(e) => setSignFirstname(e.target.value)} value={signUpFirstname} />
            <input type="text" className={styles.input} placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
            <input type="password" className={styles.input} placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
            <button onClick={() => handleRegister()}>Sign Up</button>
        </div>
    );
}

export default SignUp;