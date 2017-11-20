import fetch from 'isomorphic-fetch';

/*
* action types
* */
export const REQUEST_DATA_MONTHYEAR = 'REQUEST_DATA_MONTHYEAR';
export const RECEIVE_DATA_MONTHYEAR = 'RECEIVE_DATA_MONTHYEAR';
export const ERROR_DATA_MONTHYEAR = 'ERROR_DATA_MONTHYEAR';

export const SELECT_MONTHYEAR_SORTED_BY = 'SELECT_MONTHYEAR_SORTED_BY';
export const SELECT_MONTHYEAR_ALREADY_FETCHED = 'SELECT_MONTHYEAR_ALREADY_FETCHED';

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
    type: SELECT_MONTHYEAR_SORTED_BY,
    sortedBy
  };
}

export function selectMonthYearAlreadyFetched(paramMonthAndYear) {
  return {
    type: SELECT_MONTHYEAR_ALREADY_FETCHED,
    paramMonthAndYear
  };
}

function requestData(paramMonthAndYear) {
  return {
    type: REQUEST_DATA_MONTHYEAR,
    paramMonthAndYear
  };
}

function reveiveData(paramMonthAndYear, json) {
  return {
    type: RECEIVE_DATA_MONTHYEAR,
    paramMonthAndYear,
    data: json
  };
}

function errorData(paramMonthAndYear, err) {
  return {
    type: ERROR_DATA_MONTHYEAR,
    paramMonthAndYear,
    data: err
  };
}

function fetchData(paramMonthAndYear) {
  return dispatch => {
    // console.log(`fetchData with param : ${paramMonthAndYear}`);
    dispatch(requestData(paramMonthAndYear));
    return fetch(`https://data.marincounty.org/resource/mw3d-ud6d.json?month_and_year=${paramMonthAndYear}`)
      .then(res => res.json())
      .then(json => dispatch(reveiveData(paramMonthAndYear, json)))
      .catch(err => dispatch(errorData(paramMonthAndYear, err)));
  };
}

function shouldFetchData(state, paramMonthAndYear) {
  const stateCountByMonthYear = state.dataByTab.countByMonthYear;
  const data = stateCountByMonthYear.items[paramMonthAndYear];
  if (!data && !stateCountByMonthYear.isFetching) {
    // console.log(`shouldFetchData true`);
    return true;
  } else {
    // If we have already load the data we don't load it anymore
    // console.log(`shouldFetchData false`);
    return false;
  }
}

export function fetchDataIfNeeded(paramMonthAndYear) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), paramMonthAndYear)) {
      return dispatch(fetchData(paramMonthAndYear));
    }else {
      return dispatch(selectMonthYearAlreadyFetched(paramMonthAndYear));
    }
  };
}