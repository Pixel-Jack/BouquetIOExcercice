import { TabsType, SELECT_TAB } from '../tabs/tabsNavBarActions';


function tabsReducer(state = TabsType.COUNT_BY_MONTH_YEAR, action) {
  switch (action.type) {
    case SELECT_TAB:
      let tab = action.tab;
      return tab;
    default:
      return state;
  }
}

export default tabsReducer;