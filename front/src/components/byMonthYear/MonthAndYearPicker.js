import React from 'react';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle } from 'reactstrap';
import Picker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css';

class MonthAndYearPicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickMonthBox = this.handleClickMonthBox.bind(this);
  }

  handleClickMonthBox(e) {
    this.refs.pickAMonth.show();
  }

  render() {
    let pickerLang = {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      , from: 'From', to: 'To'
    };
    let mvalue = this.props.mvalue;
    const date = new Date();
    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth();
    let makeText = m => {
      if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + ' ' + m.year);
      return '?';
    };
    return (
        <div className="edit align-self-center">
          <Picker
            ref="pickAMonth"
            years={{ min: { year: 2010 }, max: { year: dateYear, month: dateMonth + 1 } }}
            value={mvalue}
            lang={pickerLang.months}
            onChange={this.props.onChange}
          >
            <ButtonDropdown isOpen={false} toggle={() => {
            }}>
              <DropdownToggle className="btn-container" onClick={this.handleClickMonthBox} caret>
                {this.props.paramMonthAndYear.length > 0 ? makeText(mvalue) : 'Choose a date...'}
              </DropdownToggle>
            </ButtonDropdown>
          </Picker>
        </div>
    );
  }
}

MonthAndYearPicker.PropTypes = {
  mvalue: PropTypes.object.isRequired,
  paramMonthAndYear: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};


export default MonthAndYearPicker;