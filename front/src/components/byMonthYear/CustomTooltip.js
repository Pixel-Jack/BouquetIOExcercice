import React from 'react';

class CustomTooltip extends React.Component {
  render() {
    if(this.props.active){
      let tooltip = []
      if(this.props.payload && this.props.payload[0].payload ){
        const payload = this.props.payload[0].payload;
        const listContracts = payload.listContracts;
        const listVendorNames = payload.listVendorNames;

        // Show contracts
        let contracts = payload.listAmounts.map((amount,index) => {
          return (
            <p key={index} className="desc">Contract n°{listContracts[index]}, Amount: {amount}$, Vendor: {listVendorNames[index]}</p> )
        });
        tooltip.push(
          <div key='tooltip' className="custom-tooltip" style={{backgroundColor: '#eeeeee98', padding: '5px', borderStyle: 'double'}}>
            <p className="label">{this.props.label}</p>
            <p className="intro">{`Total amount : ${payload.totalAmount}$`}</p>
            {contracts}
          </div>
        )
      } else {
        tooltip.push(
          <p>Error in CustomTooltip</p>
        )
      }
      return tooltip;
    }
    return null;
  }
}

export default CustomTooltip;