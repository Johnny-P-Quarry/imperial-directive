// @flow

import {ELITE_RED} from '../styles/colors';
import React from 'react';
import threatPng from '../assets/icons/threat.png';

const styles = {
  base: {
    alignItems: 'center',
    border: `2px solid black`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '110px',
  },
  contents: {
    color: 'black',
    fontSize: '28px',
    textAlign: 'center',
  },
  header: {
    backgroundColor: ELITE_RED,
    color: 'white',
    padding: '5px',
    textAlign: 'center',
  },
  icon: {
    height: '29px',
    marginRight: '5px',
    marginTop: '4px',
    width: '24px',
  },
  marginRight: {
    marginRight: '10px',
  },
  prefix: {
    fontSize: '20px',
  },
};

type RoundThreatTrackerPropsType = {
  round: number,
  threat: number,
};

class RoundThreatTracker extends React.Component<RoundThreatTrackerPropsType> {
  render() {
    return (
      <div style={styles.base}>
        <div style={styles.prefix}>R</div>
        <div style={{...styles.contents, ...styles.marginRight}}>{this.props.round}</div>
        <img alt="Threat" style={styles.icon} src={threatPng} />
        <div style={styles.contents}>{this.props.threat}</div>
      </div>
    );
  }
}

export default RoundThreatTracker;
