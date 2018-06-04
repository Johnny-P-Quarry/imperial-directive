// @flow

import {
  setDifficulty,
  setExpansions,
  setImperialRewards,
  setMission,
  setMissionThreat,
} from '../reducers/app';
import CharacterSelection from '../components/CharacterSelection';
import {connect} from 'react-redux';
import missions from '../data/missions';
import {setAllyChosen, setRoster} from '../reducers/rebels';
import type {StateType} from '../reducers/types';

const mapStateToProps = (state: StateType) => {
  const coreMissions = Object.keys(missions).reduce((accumulator: string[], missionKey: string) => {
    if (missions[missionKey].wave === undefined) {
      accumulator.push(missionKey);
    }
    return accumulator;
  }, []);
  const wave1Missions = Object.keys(missions).reduce(
    (accumulator: string[], missionKey: string) => {
      if (missions[missionKey].wave === 'Wave 1') {
        accumulator.push(missionKey);
      }
      return accumulator;
    },
    []
  );

  return {
    availableAllies: ['chewbacca', 'han', 'luke', 'rebelSaboteur', 'rebelTrooper'],
    availableHeroes: ['biv', 'diala', 'fenn', 'gaarkhan', 'gideon', 'jyn', 'mak', 'saska'],
    availableMissions: ['--- CORE ---']
      .concat(coreMissions)
      .concat(['--- WAVE 1 ---'])
      .concat(wave1Missions),
  };
};

const mapDispatchToProps = {
  setAllyChosen,
  setDifficulty,
  setExpansions,
  setImperialRewards,
  setMission,
  setMissionThreat,
  setRoster,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelection);
