import React from 'react'

function AnswerWidget({name, body, createdAt}) {
  return (
    <div className="container mt-4">
    <div className="card p-3 mb-2 bg-secondary text-white">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="card-text">{body}</p>
        <div className="card-footer text-muted">{createdAt.toLocaleString()}</div>
      </div>
    </div>
  </div>
);
}

export default AnswerWidget