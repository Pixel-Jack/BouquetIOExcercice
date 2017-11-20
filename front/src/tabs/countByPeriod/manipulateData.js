export function convertToListByDate(items) {
  /*
  * Input :
  * {
  * 0: {…}
amount: "0"
contract_number: "31700223"
department: "HEALTH AND HUMAN SERVICES"
month_and_year: "2016-07-01T00:00:00.000"
unique_id: "07/01/2016-31700223-0-1"
vendor_name: "SCOVIS, TEENA"
__proto__: Object { … }
1: Object { amount: "5500", contract_number: "31700325", department: "HUMAN RESOURCES", … }
2: Object { amount: "48169", contract_number: "31700440", department: "HEALTH AND HUMAN SERVICES", … }
3: Object { amount: "20000", contract_number: "31700620", department: "PROBATION", … }
4: Object { amount: "30000", contract_number: "31700023", department: "DEPARTMENT OF PUBLIC WORKS", … }
  * }
  *
  * Output :
  * {
  * "2016-07-01T00:00:00.000": {
  *     "HEALTH AND HUMAN SERVICES": {
  *           amountThisMonth: int,
  *           listAmounts: [],
  *           listContracts: [],
  *           listVendorNames: []
  *       },
  *       ...
  *   },
  *   ...
  * }
  * */
  let listByDate = {};
  if (items !== null && items !== undefined && Object.keys(items).length > 0) {
    Object.values(items).forEach(item => {
      if (listByDate[item.month_and_year] === undefined) {
        let infoDepartment = {};
        // Item 757 has a null amount
        let amount = (item.amount ? parseInt(item.amount, 10) : 0);
        infoDepartment.amountThisMonth = amount;
        infoDepartment.listAmounts = [amount];
        infoDepartment.listContracts = [item.contract_number];
        infoDepartment.listVendorNames = [item.vendor_name];
        listByDate[item.month_and_year] = { [item.department]: { ...infoDepartment } };
      } else {
        // The date already exists that means that there is at least one department
        if (listByDate[item.month_and_year][item.department] === undefined) {
          // The department is new this month
          let infoDepartment = {};
          let amount = (item.amount ? parseInt(item.amount, 10) : 0);
          infoDepartment.amountThisMonth = amount;
          infoDepartment.listAmounts = [amount];
          infoDepartment.listContracts = [item.contract_number];
          infoDepartment.listVendorNames = [item.vendor_name];
          listByDate[item.month_and_year][item.department] = { ...infoDepartment };
        } else {
          let amount = (item.amount ? parseInt(item.amount, 10) : 0);
          listByDate[item.month_and_year][item.department].amountThisMonth += amount;
          listByDate[item.month_and_year][item.department].listAmounts.push(amount);
          listByDate[item.month_and_year][item.department].listContracts.push(item.contract_number);
          listByDate[item.month_and_year][item.department].listVendorNames.push(item.vendor_name);
        }
      }
    });
    return (listByDate);
  } else {
    return null;
  }
}

export function getMaxInterval(data) {
  if (data) {
    const listDate = Object.keys(data);
    let min = listDate[0];
    let max = listDate[0];
    listDate.forEach(date => {
      if (date > max) {
        max = date;
      } else if (date < min) {
        min = date;
      }
    });
    let minDate = new Date(min);
    let maxDate = new Date(max);
    return {
      min: { year: minDate.getFullYear(), month: minDate.getMonth() + 1 },
      max: { year: maxDate.getFullYear(), month: maxDate.getMonth() + 1 }
    };
  } else {
    return 0;
  }
}

export function getDataInPeriod(dataByDate, startDate, endDate) {
  /*
  * Input:
  * {
  * "2016-07-01T00:00:00.000": {
  *     "HEALTH AND HUMAN SERVICES": {
  *           amountThisMonth: int,
  *           listAmounts: [],
  *           listContracts: [],
  *           listVendorNames: []
  *       },
  *       ...
  *   },
  *   ...
  * },
  * "2016-01-01T00:00:00.000",
  * "2016-07-01T00:00:00.000"
  * Output :
  * Array of object command in this period
  * [
  *   {
  *     department :
  *     totalAmount :
  *     bestContractDate :
  *     bestContractAmount :
  *     bestContractNumber :
  *     bestContractVendor :
  *   }
  *   ,...
  * ]
  * 
  * */
  if (dataByDate) {
    let infoDepartmentOnPeriod = {};
    Object.keys(dataByDate).forEach(date => {
      if ((date >= startDate || startDate==="") && (date <= endDate || endDate === "")) {
        Object.keys(dataByDate[date]).forEach(department => {
          let currentInfoAboutDepartment = infoDepartmentOnPeriod[department];
          if (currentInfoAboutDepartment) {
            infoDepartmentOnPeriod[department] = addInfo(currentInfoAboutDepartment, dataByDate[date][department], date);
          } else {
            const maxAmountContract = dataByDate[date][department].listAmounts.reduce(function (a, b) {
              return Math.max(a, b);
            });
            const index = dataByDate[date][department].listAmounts.indexOf(maxAmountContract);
            infoDepartmentOnPeriod[department] = {
              totalAmount: (dataByDate[date][department].amountThisMonth ? dataByDate[date][department].amountThisMonth : 0) ,
              bestContractDate: date,
              bestContractAmount: dataByDate[date][department].listAmounts[index],
              bestContractNumber: dataByDate[date][department].listContracts[index],
              bestContractVendor: dataByDate[date][department].listVendorNames[index]
            };
          }
        })
      }
    });
    return Object.keys(infoDepartmentOnPeriod).map(department => {
      return {department, ...infoDepartmentOnPeriod[department]}
    })

  } else {
    console.log('manipulateData Data null');
    return null
  }
}

function addInfo(current, infoToAdd, date) {
  /*
  Input :
  * current : {
  *     totalAmount :
  *     bestContractDate :
  *     bestContractAmount :
  *     bestContractNumber :
  *     bestContractVendor :
  *     },
  * infoToAdd : {
  *           amountThisMonth: int,
  *           listAmounts: [],
  *           listContracts: [],
  *           listVendorNames: []
  * },
  * date
  * Output : {
  *     totalAmount :
  *     bestContractDate :
  *     bestContractAmount :
  *     bestContractNumber :
  *     bestContractVendor :
  *     },
  * */
  let newInfosOnPeriod = { ...current };
  newInfosOnPeriod.totalAmount = current.totalAmount + infoToAdd.amountThisMonth;
  let maxAmountContract = infoToAdd.listAmounts.reduce(function (a, b) {
    return Math.max(a, b);
  });
  // console.log(`MaxAmount : ${maxAmountContract}`);
  // console.log(`Current Max : ${current.bestContractAmount}`);
  if (maxAmountContract > current.bestContractAmount) {
    const index = infoToAdd.listAmounts.indexOf(maxAmountContract);
    newInfosOnPeriod.bestContractAmount = maxAmountContract;
    newInfosOnPeriod.bestContractDate = date;
    newInfosOnPeriod.bestContractNumber = infoToAdd.listContracts[index];
    newInfosOnPeriod.bestContractVendor = infoToAdd.listVendorNames[index];
  }
  return newInfosOnPeriod;

}