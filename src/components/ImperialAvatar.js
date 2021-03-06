// @flow

import {ELITE_RED, IMPERIAL_BLUE, LIGHT_WHITE, SUCCESS_GREEN} from '../styles/colors';
import Arrow from 'react-svg-arrow';
import Button from './Button';
import Circle from './Circle';
import imperialPng from '../assets/icons/imperial.png';
import type {ImperialUnitType} from '../reducers/imperials';
import {positionAbsolute} from '../styles/mixins';
import React from 'react';

const styles = {
  alias: {
    ...positionAbsolute(0, null, null, 0),
  },
  avatar: {
    alignItems: 'center',
    border: '3px solid black',
    borderRadius: '42px',
    display: 'flex',
    fontSize: '32px',
    height: '80px',
    justifyContent: 'center',
    marginBottom: '10px',
    width: '80px',
  },
  base: {
    position: 'relative',
    width: '86px',
  },
  eliteAvatar: {
    border: `3px solid ${ELITE_RED}`,
  },
  exhausted: {
    border: `3px solid ${SUCCESS_GREEN}`,
    opacity: 0.4,
  },
  hpBoost: {
    ...positionAbsolute(62, 0, null, null),
    backgroundColor: 'black',
    borderRadius: '14px',
    color: 'white',
    display: 'flex',
    fontSize: '12px',
    minWidth: '14px',
    padding: '5px',
  },
  image: {
    height: '80%',
    width: '80%',
  },
  name: {
    fontSize: '13px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  numInGroup: {
    ...positionAbsolute(0, 0, null, null),
    backgroundColor: ELITE_RED,
    borderRadius: '14px',
    color: 'white',
    fontSize: '12px',
    height: '14px',
    padding: 5,
    textAlign: 'center',
    width: '14px',
  },
  outer: {
    cursor: 'pointer',
  },
  plus: {
    fontSize: '10px',
  },
  popup: {
    ...positionAbsolute(10, null, null, 0),
    alignItems: 'center',
    backgroundColor: LIGHT_WHITE,
    border: '2px solid black',
    display: 'flex',
    flexDirection: 'column',
    height: '125px',
    justifyContent: 'space-between',
    width: '175px',
    zIndex: 1,
  },
  popupAccent: {
    backgroundColor: IMPERIAL_BLUE,
    height: '5px',
    width: '100%',
  },
  popupArrow: {
    ...positionAbsolute(56, null, null, -11),
  },
  popupMask: {
    ...positionAbsolute(59, null, null, -1),
    backgroundColor: LIGHT_WHITE,
    height: '16px',
    width: '2px',
  },
};

type ImperialAvatarPropsType = {
  activateImperialGroup: Function,
  defeatImperialFigure: Function,
  imperialUnit: ImperialUnitType,
  index: number,
  isImperialPlayerTurn: boolean,
  parentDiv: ?HTMLDivElement,
};

type ImperialAvatarStateType = {
  displayPopup: boolean,
};

class ImperialAvatar extends React.Component<ImperialAvatarPropsType, ImperialAvatarStateType> {
  state = {
    displayPopup: false,
  };

  togglePopup() {
    this.setState((state: ImperialAvatarStateType) => ({displayPopup: !state.displayPopup}));
  }

  handlePopupPositioning: Function = (htmlDivPopup: ?HTMLDivElement) => {
    if (htmlDivPopup && this.props.parentDiv) {
      htmlDivPopup.style.left = `${(this.props.index + 1) * 106 -
        this.props.parentDiv.scrollLeft +
        10}px`;
    }
  };

  handleClick = () => {
    if (!this.props.isImperialPlayerTurn) {
      this.togglePopup();
    }
  };

  handleDefeatImperialFigure = () => {
    this.props.defeatImperialFigure(this.props.imperialUnit);
    this.togglePopup();
  };

  handleForceActivate = () => {
    this.props.activateImperialGroup(this.props.imperialUnit);
    this.togglePopup();
  };

  renderPopup() {
    return (
      <div style={styles.popup} ref={this.handlePopupPositioning}>
        <div style={styles.popupArrow}>
          <Arrow
            size={8}
            color={LIGHT_WHITE}
            direction="left"
            borderWidth={2}
            borderColor="black"
          />
        </div>
        <div style={styles.popupAccent} />
        <Button text="Defeat figure" onClick={this.handleDefeatImperialFigure} />
        <Button text="Force activate" onClick={this.handleForceActivate} />
        <div style={styles.popupAccent} />
        <div style={styles.popupMask} />
      </div>
    );
  }

  render() {
    const {alias, currentNumFigures, elite, exhausted, hpBoost, name} = this.props.imperialUnit;

    const avatarStyles = Object.assign(
      {},
      styles.avatar,
      elite ? styles.eliteAvatar : {},
      exhausted ? styles.exhausted : {}
    );

    return (
      <div style={styles.outer}>
        <div style={styles.base} onClick={this.handleClick}>
          <div style={avatarStyles}>
            <img alt={name} src={imperialPng} style={styles.image} />
          </div>
          <div style={styles.name}>
            {name}
            <Circle color={alias.color} number={alias.number} useSmallSize={true} />
          </div>
          <div style={styles.numInGroup}>{`x${currentNumFigures}`}</div>
          {this.props.imperialUnit.hpBoost ? (
            <div style={styles.hpBoost}>
              <span style={styles.plus}>+</span>
              {`${hpBoost} HP`}
            </div>
          ) : null}
        </div>
        {this.state.displayPopup ? this.renderPopup() : null}
      </div>
    );
  }
}

export default ImperialAvatar;
