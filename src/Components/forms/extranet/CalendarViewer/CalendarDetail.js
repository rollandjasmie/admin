import React from 'react';
import './CalendarPicker.scss';
import moment from 'moment'
import  'moment/locale/fr';
import image from '../../../../assets/images/promotion.png';
const MONTH_NAMES = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const CalendarDetail = React.forwardRef((props, ref) => {
    const {
        month, 
        year, 
        backMonth, 
        nextMonth, 
        days, 
        blank_days,
        labels, 
        setValue, 
        isToday,
        date,
        dateprom,
        tarif 
    } = props;
    return (
        <>
            <div 
                ref={ref}
                className={`w-11/12 calendar-picker show p-4 mx-4`}>

                <div className="flex items-center mb-5 ">
                    <div className="flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-800">{ MONTH_NAMES[month] }</span>
                        <span className="mx-3 text-lg text-gray-600 font-normal">{ year }</span>
                        <button 
                            type="button"
                            className={`transition bg-gray-300 ease-in-out duration-100 inline-flex cursor-pointer hover:bg-blue-200 p-1 rounded-full mr-3`} 
                            onClick={() => backMonth()}>
                            <svg className="h-6 w-6 text-gray-500 inline-flex"  fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                            </svg>  
                        </button>
                        <button 
                            type="button"
                            className={`transition bg-gray-300 ease-in-out duration-100 inline-flex cursor-pointer hover:bg-blue-200  p-1 rounded-full`} 
                            onClick={() => nextMonth()}>
                            <svg className="h-6 w-6 text-gray-500 inline-flex"  fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                            </svg>									  
                        </button>
                    </div>
                </div>

                <div className="bg-gray-200 p-4 py-8">
                    <div className="flex flex-wrap mb-3 -mx-1">
                        { labels.map((label, key) => {
                            return (<div style={{width: '14.26%'}} className="px-1" key={key}>
                                        <div
                                            className="text-gray-800 font-medium text-center text-xs">
                                            { label }
                                        </div>
                                    </div>)
                        }) }
                    </div>

                    <div className="flex flex-wrap -mx-1">
                        { blank_days.map((day, key) => {
                            return (<div 
                                style={{width: '14.28%'}}
                                key={key}
                                // className="text-center border p-1 border-transparent text-sm"	
                                className="text-center  p-1 border-transparent text-sm"
                            ></div>)
                        }) }
                        { date && days.map((day, key) => {
                            return (
                                <div style={{width: '14.28%'}} className="px-1 mb-1" key={key}>
                                    <div
                                        onClick={() => setValue(day.date)}
                                        className={`cursor-pointer text-center text-sm leading-none leading-loose transition ease-in-out duration-100 ${isToday(day.date) === true ? 'bg-yellow-400 text-white' : 'text-gray-700 hover:bg-blue-200'}`}>
                                        { day.value } <br />
                                        
                                        {/* ===========================   calendrier =============================== */}
                                        {date && date.map(o=>{
                                            if (moment(o.daty).format('LL') === moment(day.date).format('LL') && o.ouvert === "yes" ) {
                                              // && moment(new Date(o)).format("L") >= moment(new Date()).format("L")
                                              return <><div className="text-blue-600">{tarif}€</div></>
                                            } else if (moment(o.daty).format('LL') === moment(day.date).format('LL') && o.ouvert === "no"){
                                                return <div className="text-red-600">Indisponible</div>                                               
                                            }
                                        })}
                                        {/* ============================= promotion ================================== */}
                                        {dateprom && dateprom.map(prom => {
                                            if (moment(prom.daty).format('LL') === moment(day.date).format('LL') && prom.ouvert === "yes") {
                                                return <img src={image} style={{width:20,height:20}}></img>
                                            } else if (moment(prom.daty).format('LL') === moment(day.date).format('LL') && prom.ouvert === "no") {
                                               return <img src={image} style={{ width: 20, height: 20 }}></img>
                                            }
                                        })}
                                        {/*  =========================================================================== */}
                                    </div>
                                </div>
                            )
                        }) }
                    </div>
                </div>
                
            </div>
        </>
    )
});

export default CalendarDetail;