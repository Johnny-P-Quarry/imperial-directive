// @flow

import {cancel, fork, put, select, take} from 'redux-saga/effects';
import createAction from './createAction';
import {loadMission} from './mission';
import missions from '../data/missions';
import type {StateType} from './types';

import {aftermath} from './missions/aftermath';
import {aNewThreat} from './missions/aNewThreat';
import {aSimpleTask} from './missions/aSimpleTask';
import {brushfire} from './missions/brushfire';
import {captured} from './missions/captured';
import {chainOfCommand} from './missions/chainOfCommand';
import {desperateHour} from './missions/desperateHour';
import {drawnIn} from './missions/drawnIn';
import {flySolo} from './missions/flySolo';
import {friendsOfOld} from './missions/friendsOfOld';
import {generousDonations} from './missions/generousDonations';
import {highMoon} from './missions/highMoon';
import {homecoming} from './missions/homecoming';
import {imperialHospitality} from './missions/imperialHospitality';
import {impounded} from './missions/impounded';
import {incoming} from './missions/incoming';
import {indebted} from './missions/indebted';
import {lastStand} from './missions/lastStand';
import {looseCannon} from './missions/looseCannon';
import {luxuryCruise} from './missions/luxuryCruise';
import {meansOfProduction} from './missions/meansOfProduction';
import {sorryAboutTheMess} from './missions/sorryAboutTheMess';
import {targetOfOpportunity} from './missions/targetOfOpportunity';
import {temptation} from './missions/temptation';
import {theSpiceJob} from './missions/theSpiceJob';
import {theSource} from './missions/theSource';
import {underSiege} from './missions/underSiege';
import {vipersDen} from './missions/vipersDen';
import {wanted} from './missions/wanted';

// Constants

export const IMPERIAL_REWARDS = [
  'imperialIndustry',
  'oldWounds',
  'specialOperations',
  'supplyDeficit',
];

// Types

export type AppStateType = {
  currentDifficulty: string,
  currentMission: string,
  imperialRewards: {[string]: boolean},
  missionThreat: number,
};

// State

const initialState = {
  currentDifficulty: 'standard',
  currentMission: '',
  imperialRewards: {},
  missionThreat: 2,
};

export default (state: AppStateType = initialState, action: Function) => {
  switch (action.type) {
    case SET_MISSION:
      return {
        ...state,
        currentMission: action.payload.mission,
      };
    case SET_MISSION_THREAT:
      return {
        ...state,
        missionThreat: action.payload.missionThreat,
      };
    case SET_DIFFICULTY:
      return {
        ...state,
        currentDifficulty: action.payload.difficulty,
      };
    case SET_IMPERIAL_REWARDS:
      return {
        ...state,
        imperialRewards: Object.assign({}, action.payload.rewards),
      };
    default:
      return state;
  }
};

// Action types

export const SET_MISSION = 'SET_MISSION';
export const SET_MISSION_THREAT = 'SET_MISSION_THREAT';
export const SET_DIFFICULTY = 'SET_DIFFICULTY';
export const SET_IMPERIAL_REWARDS = 'SET_IMPERIAL_REWARDS';
export const MISSION_SAGA_LOAD_DONE = 'MISSION_SAGA_LOAD_DONE';

// Action creators

export const setMission = (mission: string) => createAction(SET_MISSION, {mission});
export const setMissionThreat = (missionThreat: number) =>
  createAction(SET_MISSION_THREAT, {missionThreat});
export const setDifficulty = (difficulty: string) => createAction(SET_DIFFICULTY, {difficulty});
export const setImperialRewards = (rewards: Object) => createAction(SET_IMPERIAL_REWARDS, {rewards});
export const missionSagaLoadDone = () => createAction(MISSION_SAGA_LOAD_DONE);

// Selectors

export const getCurrentMission = (state: StateType) => state.app.currentMission;
export const getMissionThreat = (state: StateType) => state.app.missionThreat;
export const getDifficulty = (state: StateType) => state.app.currentDifficulty;
export const getImperialRewards = (state: StateType) => state.app.imperialRewards;

// Sagas

function* forkMission(currentMission: string): Generator<*, *, *> {
  switch (currentMission) {
    case 'aftermath':
      yield fork(aftermath);
      break;
    case 'aNewThreat':
      yield fork(aNewThreat);
      break;
    case 'aSimpleTask':
      yield fork(aSimpleTask);
      break;
    case 'brushfire':
      yield fork(brushfire);
      break;
    case 'captured':
      yield fork(captured);
      break;
    case 'chainOfCommand':
      yield fork(chainOfCommand);
      break;
    case 'desperateHour':
      yield fork(desperateHour);
      break;
    case 'drawnIn':
      yield fork(drawnIn);
      break;
    case 'flySolo':
      yield fork(flySolo);
      break;
    case 'friendsOfOld':
      yield fork(friendsOfOld);
      break;
    case 'generousDonations':
      yield fork(generousDonations);
      break;
    case 'highMoon':
      yield fork(highMoon);
      break;
    case 'homecoming':
      yield fork(homecoming);
      break;
    case 'imperialHospitality':
      yield fork(imperialHospitality);
      break;
    case 'impounded':
      yield fork(impounded);
      break;
    case 'incoming':
      yield fork(incoming);
      break;
    case 'indebted':
      yield fork(indebted);
      break;
    case 'lastStand':
      yield fork(lastStand);
      break;
    case 'looseCannon':
      yield fork(looseCannon);
      break;
    case 'luxuryCruise':
      yield fork(luxuryCruise);
      break;
    case 'meansOfProduction':
      yield fork(meansOfProduction);
      break;
    case 'sorryAboutTheMess':
      yield fork(sorryAboutTheMess);
      break;
    case 'targetOfOpportunity':
      yield fork(targetOfOpportunity);
      break;
    case 'temptation':
      yield fork(temptation);
      break;
    case 'theSpiceJob':
      yield fork(theSpiceJob);
      break;
    case 'theSource':
      yield fork(theSource);
      break;
    case 'underSiege':
      yield fork(underSiege);
      break;
    case 'vipersDen':
      yield fork(vipersDen);
      break;
    case 'wanted':
      yield fork(wanted);
      break;
    default:
      return;
  }
}

function* loadMissionSaga(): Generator<*, *, *> {
  let task = null;
  while (true) {
    const action = yield take(SET_MISSION);
    if (task) {
      yield cancel(task);
    }
    const {mission} = action.payload;
    const missionThreat = yield select(getMissionThreat);
    const difficulty = yield select(getDifficulty);
    // Fork a copy of the saga for the current mission so we get mission specific logic
    const missionConfiguration = missions[mission];
    // Load the events
    // yield put(loadEvents(events.common));
    // Load the mission saga
    task = yield fork(forkMission, mission);
    yield take(MISSION_SAGA_LOAD_DONE);
    // Load our mission in which will kick things off
    yield put(loadMission(missionConfiguration, missionThreat, difficulty));
  }
}

export function* appSaga(): Generator<*, *, *> {
  yield fork(loadMissionSaga);
}
