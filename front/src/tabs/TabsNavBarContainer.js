import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { selectTab, TabsType } from './tabsNavBarActions';

function mapStateToProps(state) {
  return { selectedTab: state.selectedTab };
}

function mapDispatchToProps(dispatch) {
  return {
    selectTab: bindActionCreators(selectTab, dispatch)
  }
}

class TabsNavBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let byMonthYearDisabled = (this.props.selectedTab === TabsType.COUNT_BY_MONTH_YEAR);
    let byPeriodDisabled = (this.props.selectedTab === TabsType.COUNT_BY_PERIOD);
    return (
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="http://bouquet.ai/">
          <img src="http://bouquet.ai/wp-content/themes/bouquet/img/bouquet_logo.png" alt="Bouquet.ai"/>
          <br/>
          <h4 className="hero">Coding Excercise Bouquet.ai</h4></NavbarBrand>
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <h4 className="hero nav" disabled>Type of Chart :&nbsp;</h4>
            <NavItem>
              <Link className="nav" to="/" disabled={byMonthYearDisabled}> By Month </Link>
            </NavItem>
            <h4 className="hero nav" disabled>&nbsp;/&nbsp;</h4>
            <NavItem>
              <Link className="nav" to="/byperiod" disabled={byPeriodDisabled}> By Period </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

TabsNavBarContainer.PropTypes = {
  selectTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsNavBarContainer);
