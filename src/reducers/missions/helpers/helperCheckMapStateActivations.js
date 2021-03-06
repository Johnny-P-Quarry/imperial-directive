// @flow

import {getMapStates} from '../../mission';
import {select} from 'redux-saga/effects';

export default function* helperCheckMapStateActivations(
  states: string[],
  expectedNumber: number
): Generator<*, *, *> {
  const mapStates = yield select(getMapStates);
  let numActivated = 0;

  states.forEach((state: string) => {
    if (mapStates[state].activated) {
      numActivated++;
    }
  });

  if (numActivated >= expectedNumber) {
    return true;
  }

  return false;
}
