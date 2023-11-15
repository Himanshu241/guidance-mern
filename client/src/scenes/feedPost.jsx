import React from 'react'

function FeedPost({title, body, tags, createdAt, answers}) {
  return (
    <div>
        <h2>{title}</h2>
        <h4>{body}</h4>
        <h5>{answers.map(answer=>{return answer.body})}</h5>
        <p>{tags.map(tag=> tag)}</p>
        <p>{createdAt}</p>
    </div>
  )
}

export default FeedPost;