import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Card } from 'reactstrap';
import { fetchDataIfNeeded, selectSortedBy, SortedType } from './countByMonthYearActions';
import MonthAndYearPicker from '../../components/byMonthYear/MonthAndYearPicker';
import SelectSortedBy from '../../components/SelectSortedBy';
import BarChart from '../../components/byMonthYear/BarChart';

function mapStateToProps(state) {
  return { state: state.dataByTab.countByMonthYear };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDataIfNeeded: bindActionCreators(fetchDataIfNeeded, dispatch),
    selectSortedBy: bindActionCreators(selectSortedBy, dispatch)
  };
}

class CountByMonthYearContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    this.state = {
      mvalue: { year: year, month: month + 1 }
    };

    this.handleAMonthChange = this.handleAMonthChange.bind(this);
    this.handleSelectSortedBy = this.handleSelectSortedBy.bind(this);


    let monthstr = (this.state.mvalue.month <= 9 ? '0'.concat(this.state.mvalue.month.toString()) : this.state.mvalue.month.toString());
    let dateStr = `${year}-${monthstr}-01T00:00:00.000`;
    this.props.fetchDataIfNeeded(dateStr);

  }

  handleAMonthChange(year, monthNb) {
    //
    this.setState({ mvalue: { year: year, month: monthNb } });
    const monthstr = (monthNb <= 9 ? '0'.concat(monthNb.toString()) : monthNb.toString());
    const dateStr = `${year}-${monthstr}-01T00:00:00.000`;
    this.props.fetchDataIfNeeded(dateStr);
  }

  handleSelectSortedBy(sortedBy) {
    this.props.selectSortedBy(sortedBy);
  }

  render() {

    return (
      <div>
        <Card className="countByMonthContainer">
          <h1 className="hero d-flex justify-content-center">Contract amounts in Marin Country by department</h1>
          <h1 className="text-danger hero d-flex justify-content-center">{this.props.state.error.toString()}</h1>
          <div className="d-flex justify-content-around">
            <MonthAndYearPicker
              mvalue={this.state.mvalue}
              paramMonthAndYear={this.props.state.paramMonthAndYear}
              isFetching={this.props.state.isFetching}
              onChange={this.handleAMonthChange}
            />
            <SelectSortedBy
              sortedBy={this.props.state.sortedBy}
              sortedType={SortedType}
              onSelect={this.handleSelectSortedBy}
            />
          </div>
          <div className="d-flex align-self-center">
            <BarChart
              isFetching={this.props.state.isFetching}
              dataMonthYear={this.props.state.items[this.props.state.paramMonthAndYear]}
              sortedBy={this.props.state.sortedBy}
            />
          </div>
        </Card>
      </div>
    );
  }
}

CountByMonthYearContainer.PropTypes = {
  state: PropTypes.object.isRequired,
  fetchDataIfNeeded: PropTypes.func.isRequired,
  selectSortedBy: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CountByMonthYearContainer);