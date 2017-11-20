import React from 'react';
import PropTypes from 'prop-types';

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class SelectSortedBy extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
    this.onSelect = this.onSelect.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onSelect(e) {
    let newSortedBy = e.target.id;
    this.props.onSelect(newSortedBy);
  }

  render() {
    let buttonText = (this.props.sortedBy === this.props.sortedType.NONE ? 'Sort the graph' : this.props.sortedBy);
    let listDropItem = [];
    Object.keys(this.props.sortedType).forEach(key => {
      let isThisSort = this.props.sortedBy === key;
      listDropItem.push(
        <DropdownItem className="dropdownIt"
                      onClick={this.onSelect}
                      disabled={isThisSort}
                      key={key}
                      id={this.props.sortedType[key]}>
          {this.props.sortedType[key]}
        </DropdownItem>
      );
    });
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="btn-container" caret>
          {buttonText}
        </DropdownToggle>
        <DropdownMenu>
          {listDropItem}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

SelectSortedBy.PropTypes = {
  sortedBy: PropTypes.string.isRequired,
  sortedType: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default SelectSortedBy;
