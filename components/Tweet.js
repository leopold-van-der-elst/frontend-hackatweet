import React from 'react'
import styles from '../styles/Tweet.module.css'
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/Image'

function Tweet(props) {

    const [like, setLike] = useState(false);

    let heartIconStyle = { 'cursor': 'pointer' };
    const handleLike = () => {
        setLike(!like);
    }
    if(like){
        heartIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
    }

  return (
    <>
      <div className={styles.tweetContainer}>
        <div className={styles.topContent}>
          <Image className={styles.img} src="/TwitterEgg.jpeg" width={40} height={40}/>
          <h3 className={styles.tweetAuthor}>{props.username}</h3>
        </div>
        <p className={styles.tweetContent}>{props.content}</p>
        <div className={styles.logoTweet}>
          <FontAwesomeIcon className={styles.heartIcon} icon={faHeart} onClick={handleLike} style={heartIconStyle} />
          <FontAwesomeIcon className={styles.heartIcon} icon={props.icon} onClick={()=>props.handleDelete(props.id)} />
        </div>
      </div>
    </>
  )
}

export default Tweet