import {
  ERROR_DATA_MONTHYEAR,
  RECEIVE_DATA_MONTHYEAR,
  REQUEST_DATA_MONTHYEAR,
  SELECT_MONTHYEAR_ALREADY_FETCHED,
  SELECT_MONTHYEAR_SORTED_BY,
  SortedType
} from './countByMonthYearActions';

function countByMonthYearReducer(state = {
                            isFetching: false,
                            paramMonthAndYear: '',
                            sortedBy: SortedType.NONE,
                            error: '',
                            items: {}
                          },
                          action) {
  switch (action.type) {
    case ERROR_DATA_MONTHYEAR:
      // console.log(`countByMonthYearReducer ERROR_DATA_MONTHYEAR : ${action.data}`);
      // console.log(action.data);
      return { ...state, paramMonthAndYear: '', error: action.data, isFetching: false };
    case REQUEST_DATA_MONTHYEAR:
      // console.log(`countByMonthYearReducer REQUEST_DATA_MONTHYEAR : ${action.paramMonthAndYear}`);
      return { ...state, isFetching: true, paramMonthAndYear: action.paramMonthAndYear, error: '' };
    case RECEIVE_DATA_MONTHYEAR:
      // console.log('countByMonthYearReducer RECEIVE_DATA_MONTHYEAR');
      if (action.data.errorCode) {
        // There was an error in the request
        // console.log(`ERROR REQUEST : ${action.data.error}`);
        return { ...state, isFetching: false, paramMonthAndYear: '', error: action.data.message };
      }
      // There were no error
      let convertedData = convertToData(action.data);
      // console.log('countByMonthYearReducer Converted data');
      // console.log(convertedData);
      let newItems = Object.assign({}, state.items, { [action.paramMonthAndYear]: convertedData });
      return { ...state, isFetching: false, paramMonthAndYear: action.paramMonthAndYear, error: '', items: newItems };
    case SELECT_MONTHYEAR_SORTED_BY:
      return { ...state, sortedBy: action.sortedBy };
    case SELECT_MONTHYEAR_ALREADY_FETCHED:
      return { ...state, paramMonthAndYear: action.paramMonthAndYear };
    default:
      return state;
  }
}

function convertToData(json) {
  /*
  * Input :
  * [
  *   0: Object {
  *     amount: "25000"
        contract_number: "4660490"
        department: "COMMUNITY DEVELOPMENT AGENCY"
        month_and_year: "2017-05-01T00:00:00.000"
        review_document: "https://pav.marincounty.org/Publicaccess/controltemplate.aspx?MyQueryID=196&OBKEy__657_1=4660490"
        review_document_description: "4660490"
        unique_id: "05/01/2017-4660490-25000-1"
        vendor_name: "TEMPLETON, JILL-ADDENDUM"
  *  }
      1: Object { amount: "2000", contract_number: "4659725", department: "DEPARTMENT OF PUBLIC WORKS", … }
      2: Object { amount: "3786", contract_number: "4659125", department: "DEPARTMENT OF PUBLIC WORKS", … }
      ...
     ]
  * Output :
  * [
  *   {
  *     department: "HEALTH AND HUMAN SERVICES"
  *     listAmounts : [0,...],
  *     listContracts : ["31700223",...],
  *     listVendorName : ["TEMPLETON, JILL-ADDENDUM",...]
  *   },
  *   ...
  * ]
  * */
  let associativeArrayDepartment = {};
  json.forEach(element => {
    let department = element.department;
    if (associativeArrayDepartment[department]) {
      // If the department already exist in the associativeArrayDepartment object we just have to push these new information in the list of existing data of this department
      let amount = (element.amount ? parseInt(element.amount, 10) : 0);
      associativeArrayDepartment[department].totalAmount += amount;
      associativeArrayDepartment[department].listAmounts.push(amount);
      associativeArrayDepartment[department].listContracts.push(element.contract_number);
      associativeArrayDepartment[department].listVendorNames.push(element.vendor_name);
    } else {
      let newDepartment = {};
      let amount = (element.amount ? parseInt(element.amount, 10) : 0);
      newDepartment.totalAmount = amount;
      newDepartment.listAmounts = [amount];
      newDepartment.listContracts = [element.contract_number];
      newDepartment.listVendorNames = [element.vendor_name];
      associativeArrayDepartment[department] = Object.assign({}, newDepartment);
    }
  });
  // Now we need to return data an array of object usable by charts
  let data = Object.keys(associativeArrayDepartment).map(key => {
    return Object.assign({ department: key }, associativeArrayDepartment[key]);
  });
  return data;
}

export default countByMonthYearReducer;