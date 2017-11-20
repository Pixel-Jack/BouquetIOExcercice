import React from 'react';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle } from 'reactstrap';
import Picker from 'react-month-picker';

class PeriodPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickRangeBox = this.handleClickRangeBox.bind(this);
  }

  handleClickRangeBox(e) {
    this.refs.pickRange.show();
  }

  render() {
    let pickerLang = {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      from: 'From',
      to: 'To'
    };

    let makeText = m => {
      if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + ' ' + m.year);
      return '?';
    };
    let infoOnAvailableData = [];

    let mrange = {};
    if (this.props.years !== 0) {
      if (this.props.mrange.from.year < this.props.years.min.year) {
        mrange.from = this.props.years.min;
      } else if (this.props.mrange.from.year === this.props.years.min.year) {
        if (this.props.mrange.from.month < this.props.years.min.month) {
          mrange.from = this.props.years.min;
        }
        else {
          mrange.from = this.props.mrange.from;
        }
      } else {
        mrange.from = this.props.mrange.from;
      }

      if (this.props.mrange.to.year > this.props.years.max.year) {
        mrange.to = this.props.years.max;
      } else if (this.props.mrange.to.year === this.props.years.max.year) {
        if (this.props.mrange.to.month > this.props.years.max.month) {
          mrange.to = this.props.years.max;
        }
        else {
          mrange.to = this.props.mrange.to;
        }
      } else {
        mrange.to = this.props.mrange.to;
      }
      let startAvailableDate = new Date(this.props.years.min.year, this.props.years.min.month);
      let endAvailableDate = new Date(this.props.years.max.year, this.props.years.max.month);
      infoOnAvailableData.push(<h4 key={'textRange'}
                                   className="hero d-flex justify-content-center">{`We have data from ${pickerLang.months[parseInt(startAvailableDate.getMonth()-1, 10)] + ' ' + startAvailableDate.getFullYear()} to ${pickerLang.months[parseInt(endAvailableDate.getMonth()-1, 10)] + ' ' + endAvailableDate.getFullYear()}`}</h4>);
    } else {
      infoOnAvailableData.push(<h4 key={'textRange'}
                                   className="hero d-flex justify-content-center">{`There is no data available`}</h4>);
    }
    ;

    return (
      <div className="edit align-self-center">
        {infoOnAvailableData}
        <Picker
          ref="pickRange"
          years={this.props.years}
          range={mrange}
          lang={pickerLang.months}
          onChange={this.props.onChange}
        >

          <ButtonDropdown isOpen={false} toggle={() => {
          }}>
            <DropdownToggle className="btn-container" onClick={this.handleClickRangeBox} caret>
              {makeText(mrange.from)
              + ' ~ ' +
              makeText(mrange.to)}
            </DropdownToggle>
          </ButtonDropdown>
        </Picker>
      </div>
    );
  }
}

PeriodPicker.PropTypes = {
  mrange: PropTypes.object.isRequired,
  param_start_period: PropTypes.string.isRequired,
  param_end_period: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default PeriodPicker;