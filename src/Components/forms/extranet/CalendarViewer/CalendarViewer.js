import React, { Component } from 'react';
import CalendarDetail from './CalendarDetail';



export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.popupNode = React.createRef();
    }

    state = {
        date: '',
        show: false,
        value: '',
        month: '',
        year: '',
        days: [],
        blank_days: [],
        labels: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    }

    componentDidMount() {
        this.initDate(() => {
            this.getNoOfDays();
        });
    }

    initDefault = (today) => {
        const { defaultDate } = this.props;

        if (defaultDate && defaultDate !== null) {
            if (typeof defaultDate === "string") {
                switch (defaultDate) {
                    case "today":
                        this.setCurrentDate(today);
                        break;
                
                    default:
                        break;
                }
            }
            
        }
    }

    initDate = (callback) => {
        const today = new Date();

        this.setState({
           month:  today.getMonth(),
           year: today.getFullYear()
        }, () => {
            this.initDefault(today);

            if (typeof callback === 'function') {
                callback();
            }
        })
    }

    toggleDatePicker = (type) => {
        this.setState({
            show: type
        });
    }

    setCurrentDate = (date, callback) =>  {
        const value = String(date.getDate()).padStart(2, "0") + "/" + String(date.getMonth() + 1).padStart(2, "0") + "/" + date.getFullYear();
        this.setState({
            value: value
        }, () => {

            if (this.props.onChange) {
                const final_value = {
                    date: date,
                    value: value
                }

                this.props.onChange(final_value);
            }

            if (typeof callback === 'function') {
                callback();
            }
        });
    }

    isToday = (dateReference) => {
        const today= new Date()
        return today.toDateString().trim() === dateReference.toDateString().trim() ? true : false;      
    }
 

    setValue = (selectedDate) => {
        this.setCurrentDate(selectedDate, () => {
            this.toggleDatePicker(false);
        });
        console.log(this.state.value)
    }

    getNoOfDays = () => {
        const { year, month } = this.state;

        let days_month = new Date(year, month + 1, 0).getDate();

        // Find where to start calendar day of week
        let day_week = new Date(year, month).getDay();
        let i = 1;
        let blank_days = [];

        for (i = 1; i <= day_week; i++) {
            blank_days.push(i);
        }

        let days = [];
        for (i = 1; i <= days_month; i++) {
            let date = new Date(year, month, i);

            days.push({
                value: i,
                date: date
            });
        }

      
      
        
        this.setState({
            blank_days: blank_days,
            days: days
        });
    }

    backMonth = () => {
        let { month, year } = this.state;

        // Si le mois courant est en Janvier => Passer à l'année précedente
        if (month <= 0) {
            month = 11;
            year = year - 1;
        } else {
            month = month - 1;
        }

        this.setState({
            month: month,
            year: year
        }, () => {
            this.getNoOfDays();
        })
    }

    nextMonth = () => {
        let { month, year } = this.state;

        // Si le mois courant est en Décembre => Passer à l'année suivante
        if (month >= 11) {
            month = 0;
            year = year + 1;
        } else {
            month = month + 1;
        }

        this.setState({
            month: month,
            year: year
        }, () => {
            this.getNoOfDays();
        })
    }

    render() {
        const { month, year, days, blank_days, labels } = this.state;
       
        return (
            <>
                <CalendarDetail
                    ref={this.popupNode}
                    days={days}
                    labels={labels}
                    month={month}
                    year={year}
                    date={this.props.dates}
                    dateprom={this.props.dateprom}
                    backMonth={this.backMonth}
                    nextMonth={this.nextMonth}
                    setValue={this.setValue}
                    isToday={this.isToday}
                    blank_days={blank_days}
                    tarif={this.props.tarif}
                    />
            </>
        )
    }
}