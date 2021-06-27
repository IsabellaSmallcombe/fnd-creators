import React, { useState, useEffect } from 'react'
import './CreatorCard.css';
import Modal from 'react-modal';
import { NFTE } from '@nfte/react';

const CreatorCard = ({ id, netRevenue, nfts}) => {

    // const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [nftMetadata, setNftMetadata] = useState([]);
    // const [ipfsPath, setIPFSPath] = useState('');
    //const nftIPFS = [];
    const [allMetadataFetched, setAllMetadataFetched] = useState(false);

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

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        handleNftMetadata();
    }
    
    const closeModal = () => {
        setIsOpen(false);
    }

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
                    console.log('***** ', res.data.nfts);
                    //const ipfsString = "" + res.data.nfts[0].tokenIPFSPath;
                    nftJsonFetch(res.data.nfts[0].tokenIPFSPath);
                    // setIPFSPath(res.data.nfts[0].tokenIPFSPath)
                }).catch(error => console.log(error));
        }
        setAllMetadataFetched(true);
    };

    const nftJsonFetch = (jsonPath) => {
        fetch(`https://ipfs.io/ipfs/${jsonPath}`)
            .then((res) => res.json())
            .then(res => {
                setNftMetadata(res.image);
            }).catch(error => console.log(error));
    }

    const nft_display = {
        'max-width': '50px',
        margin: '10px'
    };

    return (
        <div className='creator-card'>
            <div className='profile-row-user'>
                <img className='profile-picture' src={profilePicture}/>
                <text className='username'>@{username}</text>
            </div>
            <div className='profile-row-revenue'>
                <a href={`https://foundation.app/${username}`} target="_blank" rel="noreferrer" className='fnd-link'>
                    <text className="text-details">Revenue {revenue} ETH</text>
                </a>
                <button onClick={openModal} className="text-details">NFTs Created {nfts.length}</button>
                <Modal isOpen={isOpen} onRequestClose={closeModal}>
                    {nftMetadata.map((nft, index) => {
                        return (
                            <div>
                                <div className='nft-flex'>
                                    <image key={index} src={nft} />
                                </div>
                            </div>
                        )
                    })}
                </Modal>
            </div>
        </div>
    )
}

export default CreatorCard;