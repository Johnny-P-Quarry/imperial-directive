// @flow

import Modal from '../Modal';
import React from 'react';

const styles = {
  base: {
    fontSize: '14px',
    marginTop: '15px',
    textAlign: 'center',
  },
};

type ResolveEventModalPropsType = {
  closeModals: Function,
  eventName: string,
  text: string,
  type: string,
};

class ResolveEventModal extends React.Component<ResolveEventModalPropsType> {
  handleButtonClick = () => {
    this.props.closeModals(this.props.type);
  };

  render() {
    const buttonText = 'Done';
    return (
      <Modal buttonText={buttonText} handleButtonClick={this.handleButtonClick} title="Event">
        <div style={styles.base}>{`Resolve the ${this.props.eventName} event.`}</div>
        <div style={styles.base}>{this.props.text}</div>
      </Modal>
    );
  }
}

export default ResolveEventModal;
