import React, { Component } from 'react';
import NotificationSlider from './components/notification-slider'

export default class App extends Component {

  constructor(props) {
    super();
    this.state = {
      showNotificationSlider: false
    }
  }

  showNotificationSlider() {
    this.setState({
      showNotificationSlider: true
    });
  }

  render() {
    return (
      <div>
        <div style={styles.topBand}>
          Exia
          <span style={styles.notification} onClick={() => this.showNotificationSlider()}></span>
        </div>
        {this.state.showNotificationSlider && <NotificationSlider/>}
      </div>
    );
  }
}

let styles = {
  topBand: {
    padding: '10px 25px',
    borderBottom: '1px solid #ddd',
    textAlign: 'center'
  },

  notification: {
    float: 'right',
    borderRadius: '50%',
    background: '#03a9f4',
    width: '15px',
    height: '15px',
    cursor: 'pointer'
  }
}
