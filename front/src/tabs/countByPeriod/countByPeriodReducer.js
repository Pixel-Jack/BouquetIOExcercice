import {
  ERROR_DATA_PERIOD,
  RECEIVE_DATA_PERIOD,
  REQUEST_DATA_PERIOD,
  SELECT_PERIOD_ALREADY_FETCHED,
  SELECT_PERIOD_SORTED_BY,
  SortedType
} from './countByPeriodActions';

function countByPeriodReducer(state = {
                         isFetching: false,
                         param_start_period: '',
                         param_end_period: '',
                         sortedBy: SortedType.NONE,
                         error: '',
                         items: null
                       },
                       action) {
  switch (action.type) {
    case ERROR_DATA_PERIOD:
      // console.log(`countByPeriodReducer ERROR_DATA_PERIOD : ${action.data}`);
      // console.log(action.data);
      return {
        ...state,
        param_start_period: '',
        param_end_period: '',
        error: action.data,
        items: null,
        isFetching: false
      };
    case REQUEST_DATA_PERIOD:
      // console.log(`countByPeriodReducer REQUEST_DATA_PERIOD start: ${action.param_start_period} end: ${action.param_end_period}`);
      return {
        ...state,
        isFetching: true,
        param_start_period: action.param_start_period,
        param_end_period: action.param_end_period,
        error: ''
      };
    case RECEIVE_DATA_PERIOD:
      // console.log('countByPeriodReducer RECEIVE_DATA_PERIOD');
      if (action.data.errorCode) {
        // There was an error in the request
        // console.log(`ERROR REQUEST : ${action.data.error}`);
        return {
          ...state,
          isFetching: false,
          param_start_period: '',
          param_end_period: '',
          error: action.data.message
        };
      }
      // There were no error
      let convertedData = convertToData(action.data);
      // console.log('countByPeriodReducer Converted data');
      // console.log(convertedData);
      let newItems = Object.assign({}, state.items, convertedData);
      return {
        ...state,
        isFetching: false,
        param_start_period: action.param_start_period,
        param_end_period: action.param_end_period,
        error: '',
        items: newItems
      };
    case SELECT_PERIOD_ALREADY_FETCHED:
      // console.log("SELECT_PERIOD_ALREADY_FETCHED");
      // console.log(action.param_start_period + ' ' + action.param_end_period);
      return {
        ...state,
        param_start_period: action.param_start_period,
        param_end_period: action.param_end_period
      };
    case SELECT_PERIOD_SORTED_BY:
      // console.log(`countByPeriodReducer SELECT_PERIOD_SORTED_BY ${action.sortedBy}`);
      return { ...state, sortedBy: action.sortedBy };
    default:
      return state;
  }
}

function convertToData(json) {
  return json;
}

export default countByPeriodReducer;