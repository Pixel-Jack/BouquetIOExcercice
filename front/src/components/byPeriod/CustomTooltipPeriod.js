import React from 'react';

class CustomTooltipPeriod extends React.Component {
  render() {
    if(this.props.active){
      let tooltip = []
      if(this.props.payload && this.props.payload[0].payload ){
        const payload = this.props.payload[0].payload;

        tooltip.push(
          <div key='tooltip' className="custom-tooltip" style={{backgroundColor: '#eeeeee98', padding: '5px', borderStyle: 'double'}}>
            <p className="label">{this.props.label}</p>
            <p className="intro">{`Total amount : ${payload.totalAmount}$`}</p>
            <p className="intro"> Best Contract :</p>
            <p className="desc">{`Contract n°${payload.bestContractNumber}`}</p>
            <p className="desc">{`Date : ${payload.bestContractDate.split('T')[0].substring(0,7)}`}</p>
            <p className="desc">{`Amount : ${payload.bestContractAmount}`}</p>
            <p className="desc">{`Vendor : ${payload.bestContractVendor}`}</p>
          </div>
        )
      } else {
        tooltip.push(
          <p>Error in CustomTooltipPeriod</p>
        )
      }
      return tooltip;
    }
    return null;
  }
}

/*payload
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
  * */

export default CustomTooltipPeriod;