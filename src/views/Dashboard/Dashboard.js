import React, { Component } from 'react';

import Developer from './Developer';
import LoRa from './LoRa';
import Feature from './Feature';
import Application from './Application';
import './DashboardStyle.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Developer />
        <LoRa />
        <Feature />
        <Application />
      </div>
    );
  }
}

export default Dashboard;
