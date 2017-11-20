import { combineReducers } from 'redux';

import countByMonthYearReducer from '../tabs/countByMonthYear/countByMonthYearReducer';
import countByPeriodReducer from '../tabs/countByPeriod/countByPeriodReducer';
import tabsReducer from '../tabs/tabsNavBarReducer';

const dataByTab = combineReducers({
  countByMonthYear: countByMonthYearReducer,
  countByPeriod: countByPeriodReducer
});

const appReducer = combineReducers({
  selectedTab: tabsReducer,
  dataByTab
});

export default appReducer;