import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDataIfNeeded, selectSortedBy, SortedType } from './countByPeriodActions';
import PeriodPicker from '../../components/byPeriod/PeriodPicker';
import SelectSortedBy from '../../components/SelectSortedBy';
import { Card } from 'reactstrap';
import { convertToListByDate, getDataInPeriod, getMaxInterval } from './manipulateData';
import BarChartPeriod from '../../components/byPeriod/BarChartPeriod';

function mapStateToProps(state) {
  return { state: state.dataByTab.countByPeriod };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDataIfNeeded: bindActionCreators(fetchDataIfNeeded, dispatch),
    selectSortedBy: bindActionCreators(selectSortedBy, dispatch)
  };
}

class CountByPeriodContainer extends React.Component {
  constructor(props) {
    super(props);

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let dataByDate = convertToListByDate(this.props.state.items);
    this.state = {
      mrange: { from: { year: 2017, month: 1 }, to: { year: year, month: month + 1 } },
      dataByDate: dataByDate,
      dataPeriod: getDataInPeriod(dataByDate, this.props.state.param_start_period, this.props.state.param_end_period)
    };

    this.handleSelectSortedBy = this.handleSelectSortedBy.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.launchFetchWithNewState = this.launchFetchWithNewState.bind(this);

    this.props.fetchDataIfNeeded(this.props.state.param_start_period, this.props.state.param_end_period);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.state !== nextProps.state) {
      // Be careful nextProps has a diffents structure than this.props.state
      let dataByDate = convertToListByDate(nextProps.state.items);
      this.setState({
        dataByDate: dataByDate,
        dataPeriod: getDataInPeriod(dataByDate, nextProps.state.param_start_period, nextProps.state.param_end_period)
      });
    }
  }

  handleSelectSortedBy(sortedBy) {
    this.props.selectSortedBy(sortedBy);
  }

  handleRangeChange(year, month, listIndex) {
    if (listIndex === 0) {
      this.setState(prevState => {
        let newState = Object.assign({}, prevState);
        newState.mrange.from = { year, month };
        this.launchFetchWithNewState(newState);
        return newState;
      });
    }
    if (listIndex === 1) {
      this.setState(prevState => {
        let newState = Object.assign({}, prevState);
        newState.mrange.to = { year, month };
        this.launchFetchWithNewState(newState);
        return newState;
      });
    }
  }

  launchFetchWithNewState(newState) {
    const monthFromstr = (newState.mrange.from.month <= 9 ? '0'.concat(newState.mrange.from.month.toString()) : newState.mrange.from.month.toString());
    const dateFromStr = `${newState.mrange.from.year}-${monthFromstr}-01T00:00:00.000`;

    const monthTostr = (newState.mrange.to.month <= 9 ? '0'.concat(newState.mrange.to.month.toString()) : newState.mrange.to.month.toString());
    const dateToStr = `${newState.mrange.to.year}-${monthTostr}-01T00:00:00.000`;
    this.props.fetchDataIfNeeded(dateFromStr, dateToStr);
  }

  render() {
    const years = getMaxInterval(this.state.dataByDate);
    return (
      <div>
        <Card className="countByMonthContainer">
          <h1 className="hero d-flex justify-content-center">Contract amounts in Marin Country by department</h1>
          <h1 className="text-danger hero d-flex justify-content-center">{this.props.state.error.toString()}</h1>
          <div className="d-flex justify-content-around">

            <PeriodPicker
              mrange={this.state.mrange}
              years={years}
              param_start_period={this.props.state.param_start_period}
              param_end_period={this.props.state.param_end_period}
              isFetching={this.props.state.isFetching}
              onChange={this.handleRangeChange}
            />

            <SelectSortedBy
              sortedBy={this.props.state.sortedBy}
              sortedType={SortedType}
              onSelect={this.handleSelectSortedBy}
            />
          </div>

          <div className="d-flex align-self-center">
            <BarChartPeriod
              isFetching={this.props.state.isFetching}
              dataByPeriod={this.state.dataPeriod}
              sortedBy={this.props.state.sortedBy}
            />
          </div>
        </Card>

      </div>
    );
  }
}

CountByPeriodContainer.PropTypes = {
  state: PropTypes.object.isRequired,
  fetchDataIfNeeded: PropTypes.func.isRequired,
  selectSortedBy: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CountByPeriodContainer);