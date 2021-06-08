import React from 'react'
import './CreatorCard.css';

const CreatorCard = ({ id, netRevenue, nftsCreated }) => {

    // const nfts = '';
    // example ID: "0x3b3ee1931dc30c1957379fac9aba94d1c48a5405-24437"
    // FND contract and then token ID

    return (
        <div className='creator-card'>
            <text>{id}</text>
            <text>{netRevenue} ETH</text>
            <text>NFTs Created {nftsCreated.length}</text>
        </div>
    )
}

export default CreatorCard;