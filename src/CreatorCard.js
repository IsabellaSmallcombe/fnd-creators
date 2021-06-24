import React, { useState, useEffect } from 'react'
import './CreatorCard.css';

const CreatorCard = ({ id, netRevenue, nfts}) => {

    const [open, setOpen] = useState(false);
    const [nftMetadata, setNftMetadata] = useState([]);
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

    // const nfts = '';
    // example ID: "0xf74d1224931afa9cf12d06092c1eb1818d1e255c-24437"

    // https://ipfs.foundation.app/ipfs/


    const handleNftMetadata = () => {
        const nftsIPFS = [];
        const ipfsPath = 'https://gateway.pinata.cloud/';
        for (var i = 0; i < nfts.length && i < 3; i++) {
            const metadataPath = 'https://ipfs.foundation.app/ipfs/' + nfts[i].tokenIPFSPath;
            fetch(metadataPath, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                },})
                .then((res) => res.json())
                .then(res => {
                    console.log(res);
                    const ipfsHash = res.image.split('ipfs://');
                    console.log(ipfsHash);
                    const ipfsUrl = ipfsPath + ipfsHash[1];
                    nftsIPFS.push(ipfsUrl);
                }).catch(error => console.log(error));
        }
        setNftMetadata(nftsIPFS);
        console.log(nftMetadata);
    };
    
    // clean this up
    const onClickHandler = () => {
        if (open) {
            setOpen(false);
        }else{
            setOpen(true);
            handleNftMetadata();
        }
    };

    return (
        <a href={`https://foundation.app/${username}`} target="_blank" text-decoration="none">
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