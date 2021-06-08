import React, { useState, useEffect } from 'react';
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
                    account {
                      id
                    }
                    nfts {
                      id
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

  return (
    <div className="App">
      <header className="App-header">
        <div className="div-handle">Foundation Creators</div>
        <header>Top 100 Highest Selling Creators</header>
        <div className="div-creator-box">
          {creators.map(creator => {
            return (
              <CreatorCard id={creator.id} netRevenue={creator.netRevenueInETH} nftsCreated={creator.nfts} />
            )
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
