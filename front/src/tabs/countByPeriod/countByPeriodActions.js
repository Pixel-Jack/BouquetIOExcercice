import fetch from 'isomorphic-fetch';

/*
* action types
* */
export const REQUEST_DATA_PERIOD = 'REQUEST_DATA_PERIOD';
export const RECEIVE_DATA_PERIOD = 'RECEIVE_DATA_PERIOD';
export const ERROR_DATA_PERIOD = 'ERROR_DATA_PERIOD';

export const SELECT_PERIOD_SORTED_BY = 'SELECT_PERIOD_SORTED_BY';
export const SELECT_PERIOD_ALREADY_FETCHED = 'SELECT_PERIOD_ALREADY_FETCHED';

/*
* other constants
* */

export const SortedType = {
  NONE: 'NONE',
  ALPHA: 'ALPHA',
  AMOUNT_ASC: 'AMOUNT_ASC',
  AMOUNT_DESC: 'AMOUNT_DESC'
};

/*
* Actions creators
* */
export function selectSortedBy(sortedBy) {
  return {
    type: SELECT_PERIOD_SORTED_BY,
    sortedBy
  };
}

export function selectPeriodAlreadyFetched(param_start_period, param_end_period) {
  return {
    type: SELECT_PERIOD_ALREADY_FETCHED,
    param_start_period,
    param_end_period
  };
}

function requestData(param_start_period, param_end_period) {
  return {
    type: REQUEST_DATA_PERIOD,
    param_start_period,
    param_end_period
  };
}

function reveiveData(param_start_period, param_end_period, json) {
  return {
    type: RECEIVE_DATA_PERIOD,
    param_start_period,
    param_end_period,
    data: json
  };
}

function errorData(param_start_period, param_end_period, err) {
  return {
    type: ERROR_DATA_PERIOD,
    param_start_period,
    param_end_period,
    data: err
  };
}

function fetchData(param_start_period, param_end_period) {
  return dispatch => {
    // console.log(`fetchData with param start: ${param_start_period} end : ${param_end_period}`);
    dispatch(requestData(param_start_period, param_end_period));
    return fetch(`https://data.marincounty.org/resource/mw3d-ud6d.json`)
      .then(res => res.json())
      .then(json => dispatch(reveiveData(param_start_period, param_end_period, json)))
      .catch(err => dispatch(errorData(param_start_period, param_end_period, err)));
  };
}

function shouldFetchData(state) {
  const stateCountByPeriod = state.dataByTab.countByPeriod;
  const data = stateCountByPeriod.items;
  if (!data && !stateCountByPeriod.isFetching) {
    // console.log(`shouldFetchData Period true`);
    return true;
  } else {
    // If we have already load the data we don't load it anymore
    // console.log(`shouldFetchData Period false`);
    return false;
  }
}

export function fetchDataIfNeeded(param_start_period, param_end_period) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), param_start_period, param_end_period)) {
      return dispatch(fetchData(param_start_period, param_end_period));
    } else {
      return dispatch(selectPeriodAlreadyFetched(param_start_period, param_end_period));
    }
  };
}