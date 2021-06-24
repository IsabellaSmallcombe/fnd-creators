import React, { useState, useEffect } from 'react'
import './CreatorCard.css';

const CreatorCard = ({ id, netRevenue, nfts}) => {

    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const revenue = Math.round(parseInt(netRevenue) * 10) / 10;

    useEffect(() => {
            fetch('https://stark-mountain-23648.herokuapp.com/https://api.foundation.app/graphql', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Origin':  '*',
            },
            body: JSON.stringify({
                query: `
                    {
                        user(publicKey: "${id}") {
                            username
                            profileImageUrl
                        }
                    }
                `
            })
        })
        .then((res) => res.json())
        .then(res => {
            setUsername(res.data.user.username);
            setProfilePicture(res.data.user.profileImageUrl);
        }).catch(error => console.log(error));
    });

    return (
        <a href={`https://foundation.app/${username}`} target="_blank" text-decoration="none" rel="noreferrer">
            <div className='creator-card'>
                <div className='profile-row-user'>
                    <img className='profile-picture' src={profilePicture}/>
                    <text className='username'>@{username}</text>
                </div>
                <div className='profile-row-revenue'>
                    <text className="text-details">Revenue {revenue} ETH</text>
                    <text className="text-details">NFTs Created {nfts.length}</text>
                </div>
            </div>
        </a>
    )
}

export default CreatorCard;