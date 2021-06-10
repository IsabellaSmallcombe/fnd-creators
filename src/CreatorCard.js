import React, { useState, useEffect } from 'react'
import './CreatorCard.css';

const CreatorCard = ({ id, netRevenue, nfts}) => {

    const [open, setOpen] = useState(false);
    const [nftMetadata, setNftMetadata] = useState([]);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [ipfsPath, setIPFSPath] = useState('');

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

    const handleNftMetadata = () => {
        for (var i = 0; i < nfts.length && i < 3; i++) {
            console.log('hi');

                const tokenId = nfts[i].id.split('-');
                console.log(tokenId);
                fetch('https://api.thegraph.com/subgraphs/name/f8n/fnd', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            {
                                nfts(where: {tokenId: ${tokenId[1]}}) {
                                    tokenIPFSPath
                                }
                            }
                        `
                        })
                    })
                    .then((res) => res.json())
                    .then(res => {
                        console.log(res.data.nfts[0].tokenIPFSPath);
                        const ipfsString = "" + res.data.nfts[0].tokenIPFSPath;
                        setIPFSPath(res.data.nfts[0].tokenIPFSPath)
                    }).catch(error => console.log(error));
        }
    };
    
    // clean this up
    const onClickHandler = () => {
        if (open) {
            setOpen(false);
        }else{
            setOpen(true);
            //handleNftMetadata();
        }
    };

    return (
        <div className='creator-card'>
            <text>@{username}</text>
            <img className='profile-picture' src={profilePicture}/>
            <text>{netRevenue} ETH</text>
            <text>NFTs Created {nfts.length}</text>
            <button onClick={onClickHandler}>Drop down</button>
            {open && (
                <>
                <text> hello</text>
                <div className='nft-row'>
                    <img className='nft-display' src="https://ipfs.io/ipfs/QmauUZUuQf4z9AT21jMGKKuvuRi1FDEA1ev3BevQETSp83/nft.png" />
                    <img className='nft-display' src="https://ipfs.io/ipfs/QmauUZUuQf4z9AT21jMGKKuvuRi1FDEA1ev3BevQETSp83/nft.png" />
                    <img className='nft-display' src="https://ipfs.io/ipfs/QmauUZUuQf4z9AT21jMGKKuvuRi1FDEA1ev3BevQETSp83/nft.png" />
                </div>
                <a className="button-find-more" href={`https://foundation.app/${username}`} target="_blank">View more on Foundation</a> 
                </>
            )}
        </div>
    )
}

export default CreatorCard;