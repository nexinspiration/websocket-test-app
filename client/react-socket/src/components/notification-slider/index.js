import React, { Component } from 'react';

export default class NotificationSlider extends Component {

  constructor(props) {
    super();
    this.state = {
      messages: [],
      assignedTasks: 0,
      reminders: 0,
      notifications: 0
    }
  }

  closeNotification(message) {
    // Handle closing of message via API
    console.log(`close => ${message}`);
  }

  viewNotification(message) {
    console.log(`view => ${message}`);
  }

  componentDidMount() {
    let connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
      // connection is opened and ready to use
      console.log('opened');
    };
  
    connection.onerror = function (error) {
      // an error occurred when sending/receiving data
      console.error('network error')
    };
  
    connection.onmessage = message => {
      // handle incoming message
      try {
        let json = JSON.parse(message.data);
        let messages = [...this.state.messages];
        messages.push(json.message);
        this.setState({
          messages,
          assignedTasks: json.assignedTasks,
          reminders: json.reminders,
          notifications: json.notifications
        });
      } catch (e) {
        console.log(e);
      }
    };
  }

  listifyItems(messages) {
    messages = [...messages].reverse();
    return (
      messages.map(message => {
        return (
          <div style={styles.notificationBar}>
            <div style={styles.closeIcon} onClick={() => this.closeNotification(message)}>x</div>
            <b>Just Now</b>
            <div style={styles.notificationMessage}>{message} <span style={styles.viewTask} onClick={() => this.viewNotification(message)}>View Task &gt;</span></div>
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.date}>{new Date().toDateString()}</div>

        <div style={styles.notificationOverview}>
          <div>
            <span style={styles.notificationCount}>{this.state.assignedTasks}</span>
            Assigned Tasks
          </div>
          <div>
            <span style={styles.notificationCount}>{this.state.reminders}</span>
            Reminders
          </div>
          <div>
            <span style={styles.notificationCount}>{this.state.notifications}</span>
            Notifications
          </div>
        </div>

        <div style={styles.workspace}>My Workspace &gt;</div>

        <div style={styles.messageSection}>
          {this.listifyItems(this.state.messages)}
        </div>

      </div>
    );
  }
}

const styles = {
  container: {
    position: 'fixed',
    right: '0',
    top: '0',
    background: '#fff',
    border: '1px solid #ddd',
    borderTopWidth: '6px',
    height: '100%',
    width: '300px',
    color: '#999'
  },

  date: {
    fontSize: '23px',
    fontWeight: '300',
    padding: '20px',
    borderBottom: '1px solid #ddd'
  },

  notificationOverview: {
    fontSize: '15px',
    display: 'flex',
    height: '200px',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },

  notificationCount: {
    color: '#C0DAEF',
    fontSize: '31px',
    marginRight: '10px',
    fontWeight: '300',
    verticalAlign: 'sub'
  },

  workspace: {
    color: '#03a9f4',
    fontSize: '12px',
    textAlign: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #ddd',
    fontWeight: '300',
    cursor: 'pointer',
  },

  messageSection: {
    position: 'absolute',
    width: '100%',
    overflowY: 'auto',
    height: 'calc(100% - 322px)'
  },

  notificationBar: {
    padding: '25px 15px',
    borderBottom: '1px solid #ddd',
    fontSize: '16px',
    color: '#333',
    fontSize: '13px',
    fontWeight: '300'
  },

  closeIcon: {
    textAlign: 'right',
    cursor: 'pointer',
    fontSize: '15px',
    color: '#999'
  },

  viewTask: {
    fontSize: '11px',
    color: '#03a9f4',
    cursor: 'pointer',
  },

  notificationMessage: {
    color: '#999',
    marginTop: '5px'
  }
};
