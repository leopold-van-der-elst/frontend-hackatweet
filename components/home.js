import React from 'react'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import Tweet from './Tweet'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Home() {

    const [tweetInput, setTweetInput] = useState("")
    const [tweet, setTweet] = useState([])
    const [helper, setHelper] = useState(0)

    const userId = useSelector((state)=> state.user.value.id )
    const username = useSelector((state) => state.user.value.username); 
    const token = useSelector((state) => state.user.value.token)
    console.log(userId, username, token)
    const handleDelete = (id) => {
      fetch('http://localhost:3000/tweets/remove', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: id})
        })
        .then(response => response.json())
        .then(data => {
          setHelper(helper + 1)
          console.log(data)
        })
  }

    const handleGetTweet = () => {
        fetch("http://localhost:3000/tweets/tweet")
        .then(response => response.json())
        .then(data => {
                setTweet(data.tweet)
        })        
    }
     const handleAddTweet = () => {
        var regexp = /\#\w\w+\s?/g
        const result = tweetInput.match(regexp);
        fetch(`http://localhost:3000/tweets/new`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: tweetInput, username , hashtag: result})
          })
          .then(response => response.json())
          .then(data => {
            setTweetInput("")
            setHelper(helper + 1)
          })
    }


    useEffect(() => {
        handleGetTweet()
    }, [helper])


    const handleTweetInput = (e) => {
        setTweetInput(e.target.value)
        console.log(tweetInput)
    }
    const tweets = tweet.map((tweet, i) => {
        return <Tweet key={i} content={tweet.content} username={username} id={tweet._id} icon={faTrash} handleDelete={handleDelete} />
    })

  return (
    <div className={styles.mainContainer}>
    <div className={styles.leftContainer}></div>
    <div className={styles.midContainer}>
        <div className={styles.addContainer}>
            <h2 className={styles.titleComponent}>Home</h2>
        <input className={styles.inputAdd} type="text" placeholder='Whats up?' value={tweetInput} onChange={(e) => handleTweetInput(e)} />
        <div className={styles.btnAndTxt}>
        <p className={styles.lengthText}>{tweetInput.length}/250</p>
        <button className={styles.btnTweet} type="button" onClick={handleAddTweet}>Tweet</button>
        </div>
        </div>
        <div className={styles.tweetContainer}>
        {tweets}
        </div>
        </div>
    <div className={styles.rightContainer}></div>
    </div>
  )
}

export default Home