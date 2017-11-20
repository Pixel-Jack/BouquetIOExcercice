/*
* action types
* */
export const SELECT_TAB='SELECT_TAB';

/*
* other constants
* */

export const TabsType = {
  COUNT_BY_MONTH_YEAR: 'COUNT_BY_MONTH_YEAR',
  COUNT_BY_PERIOD: 'COUNT_BY_PERIOD'
}

/*
* Actions creators
* */
export function selectTab(tab){
  return {
    type: SELECT_TAB,
    tab
  }
}
