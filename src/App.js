import React, { Component } from 'react';
import Reward from 'react-rewards';
import './App.css';
import BodyCreators from './BodyCreators';

 class App extends Component {

  state = {
    isLiked: false
  };

  processLike = () => {
    this.setState({
      isLiked: true
    });
    this.reward.rewardMe();
    console.log('clicked');
  }

  render() {
      return (
      <div className="App">
        <header className="App-header">
          <div>
            <Reward ref={(ref) => { this.reward = ref }} type='emoji' config={{
            springAnimation: true,
            elementCount: 40,
            emoji: ['🌐', '👩‍🎨', '🎨', '🖼', ''],
            angle: -90,
            spread: 150,
            startVelocity: 40,
            decay: 0.8,
          }}>
              <button onClick={this.processLike} className='fnd-creators'>Foundation Creators</button>
            </Reward>
          </div>
        </header>
        <body>
          <BodyCreators />
        </body>
        <footer>
          <text>* Revenue is the total amount of money earned by the creator after Foundation's hosting percentage</text>
          <a href={'https://twitter.com/iismallcombe'} target="_blank" text-decoration="none" rel="noreferrer">
            <text>Made by @iismallcombe</text>
          </a>
        </footer>
      </div>
    );
  }
  
}

export default App;
