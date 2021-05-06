import React from "react";
import { DateRangePicker } from "materialui-daterange-picker";
import moment from 'moment'



const CalendrierComponent = props => {
  const [open, setOpen] = React.useState(true);
  // const [dateRange, setDateRange] = React.useState();


  let date = (range) => {
    // setDateRange({
    //   range
    // })
    props.date({
      range
    })
  }
  const toggle = () => setOpen(open);
  const today = new moment().subtract(1, 'days');

  return (

    <DateRangePicker
      disablePast={true}
      minDate={today}
      open={open}
      toggle={toggle}
      onChange={(range) => date(range)}
      format={"DD/YYYY/MM"}
      
    />
  );


}




export default CalendrierComponent;