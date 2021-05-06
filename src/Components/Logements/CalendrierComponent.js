import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { fr} from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

export default function CalendrierComponent(props){
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [focus, setFocus] = useState(START_DATE)
      //  <p>Date de debut: {startDate ? format(startDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p>}
      //  <p>Date Fin: {endDate ? format(endDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.</p>
  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
    
  }
  
  useEffect(()=>{
    props.dateRange(dates)
  },[focus])
  let dates = {debut: startDate, fin: endDate}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  return (
    <div className="w-full">

 
      <DateRangePickerCalendar
        startDate={startDate}
        endDate={endDate}
        focus={focus}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFocusChange={handleFocusChange}
        locale={fr}
      />
     
    </div>
  )
}