import React, { useState, useEffect } from 'react';
import Reward from 'react-rewards';
import './App.css';
import CreatorCard from './CreatorCard';

function App() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    fetch('https://api.thegraph.com/subgraphs/name/f8n/fnd', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                {
                  creators(orderBy:netSalesInETH, orderDirection:desc) {
                    id
                    nfts {
                      id
                      tokenIPFSPath
                    }
                    netRevenueInETH
                  }
                }
            `
        })
    })
    .then((res) => res.json())
    .then(res => {
      setCreators(res.data.creators);
      console.log(res.data.creators);
    }).catch(error => console.log(error));
  }, []);

  // this.reward.rewardMe();

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {/* <Reward ref={(ref) => { this.reward = ref }} type='emoji'> */}
            <button className='fnd-creators'>Foundation Creators</button>
          {/* </Reward> */}
        </div>
      </header>
      <body>
        <div className='fnd-creators-list'>
            <p className="top-creators">Top Creators</p>
            <div className="div-creator-box">
              {creators.map((creator, index) => {
                return (
                  <CreatorCard key={index} id={creator.id} netRevenue={creator.netRevenueInETH} nfts={creator.nfts} />
                )
              })}
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
