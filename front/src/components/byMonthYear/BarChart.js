import React from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import PropTypes from 'prop-types';

import { SortedType } from '../../tabs/countByMonthYear/countByMonthYearActions';
import '../loader.css';
import CustomTooltip from './CustomTooltip';

class BarCountChart extends React.Component {
  constructor(props) {
    super(props);
    this.sortData = this.sortData.bind(this);
  }

  sortData(data) {
    let returnData = data.slice();
    let typeOfSort = this.props.sortedBy;
    switch (typeOfSort) {
      case(SortedType.ALPHA):
        return returnData.sort(this.compareAlpha);
      case(SortedType.AMOUNT_ASC):
        return returnData.sort(this.compareAmountASC);
      case(SortedType.AMOUNT_DESC):
        return returnData.sort(this.compareAmountDESC);
      default:
        return returnData;
    }

  }

  compareAlpha(a, b) {
    if (a.department.toLowerCase() < b.department.toLowerCase()) {
      return -1;
    }
    if (a.department.toLowerCase() > b.department.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  compareAmountASC(a, b) {
    if (a.totalAmount < b.totalAmount) {
      return -1;
    }
    if (a.totalAmount > b.totalAmount) {
      return 1;
    }
    return 0;
  }

  compareAmountDESC(a, b) {
    if (a.totalAmount > b.totalAmount) {
      return -1;
    }
    if (a.totalAmount < b.totalAmount) {
      return 1;
    }
    return 0;
  }

  render() {
    const dataMonthYear = this.props.dataMonthYear;
    let barChart = [];
    // At the beginning there is no dataMonthYear or during a fetching
    if (dataMonthYear && dataMonthYear.length > 0) {
      let sortData = this.sortData(dataMonthYear);
      barChart.push(
        <BarChart width={1500} height={600} data={sortData} key={'barchart'} barCategoryGap="10%"
                  margin={{ top: 50, right: 50, bottom: 100, left: 100 }}>
          <XAxis dataKey="department" interval={0}
                 tick={{ angle: -20, textAnchor: 'end', strokeWidth: 1, fontSize: '80%' }}/>
          <YAxis label={{ value: 'Total amount($)', angle: -90, position: 'insideLeft', strokeWidth: 1 }}
                 tick={{ angle: -20, textAnchor: 'end', fontSize: '70%' }}
          />
          <Tooltip payload={sortData} content={<CustomTooltip/>}/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Bar dataKey="totalAmount" fill="#ed7b2980" stroke="#7A7A98" strokeWidth="2"/>
        </BarChart>
      );
    } else {
      barChart.push(
        <div key={'NoDataMonthYear'}>
          {this.props.isFetching ?
            <div>
              <div className="d-flex justify-content-center loader"></div>
              <h3 className="hero d-flex justify-content-center">Loading...</h3>
            </div>
            :
            <h3 className="hero d-flex justify-content-center" key={'NoData'}>There is no data<br/>  Choose a date !</h3>
          }
        </div>
      );
    }
    return (
      <div >
        {barChart}
      </div>

    );
  }
}

BarCountChart.PropTypes = {
  sortedBy: PropTypes.string.isRequired,
  dataMonthYear: PropTypes.object.isRequired,
  isFetching: PropTypes.object.isRequired
};

export default BarCountChart;

