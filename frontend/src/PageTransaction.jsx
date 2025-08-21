import React from 'react';
import { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import { Rating } from 'react-simple-star-rating'

export default function PageTransaction() {
  const transaction = useLoaderData();

  
  return (
    <div className="container">
      <div className="movie-details" id="movieDetails">
        <img src={transaction.image_url} alt="image_url" id="image_url"/>
        <div className="info">
          <h2>{transaction.title}</h2>
          <p>{transaction.description}</p>
          <p><strong>Amount:</strong> <span>{transaction.amount}</span></p>
          <p><strong>Description:</strong> <span>{transaction.description}</span></p>
          <p><strong>Category:</strong> <span>{transaction.category}</span></p>
          <p><strong>Account:</strong> <span>{transaction.account}</span></p>
          <p><strong>Cashflow:</strong> <span>{transaction.cashflow}</span></p>
          <p><strong>Date:</strong> <span>{transaction.datetime}</span></p>
        </div>
      </div>
    </div>
  )
};
