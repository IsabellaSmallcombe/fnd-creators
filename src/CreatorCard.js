import React, { useState } from 'react'
import './CreatorCard.css';

const CreatorCard = ({ id, netRevenue, nfts}) => {

    const [open, setOpen] = useState(false);
    const [nftMetadata, setNftMetadata] = useState([]);

    // const nfts = '';
    // example ID: "0xf74d1224931afa9cf12d06092c1eb1818d1e255c-24437"

    const handleNftMetadata = () => {
        for (var i = 0; i < nfts.length && i < 3; i++) {
            console.log('hi');

                const tokenId = nfts[i].id.split('-');
                console.log(tokenId);
                console.log(`https://api.opensea.io/api/v1/asset/${id}/${tokenId[1]}/`);
                fetch(`https://api.opensea.io/api/v1/asset/${id}/${nfts[i]}/`, {
                method: 'GET', 
                    headers: {
                    'Content-Type': 'application/json',
                    },
                })
                .then((res) => res.json())
                .then(res => {
                    console.log(res);
                }).catch(error => console.log(error));
        }
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
        <div className='creator-card'>
            <text>{id}</text>
            <text>{netRevenue} ETH</text>
            <text>NFTs Created {nfts.length}</text>
            <div className="nft-embed"></div>
            <button onClick={onClickHandler}>Drop down</button>
            {open && (
                <text> hello</text>
            )}
        </div>
    )
}

export default CreatorCard;