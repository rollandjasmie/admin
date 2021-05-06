import React, { Component } from 'react';

class StepProgress extends Component {
    render() {
        return (
            <>
               
                                <div className="flex">
                                    { this.props.stepList && this.props.stepList.map(stepItem => {
                                        return (
                                            <div
                                                className="mx-5 text-center ml-10  py-2 rounded-md text-sm font-medium leading-5 text-gray-300  focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                                                { stepItem.title }
                                                <div className="flex mt-2 justify-center items-center">
                                                    { stepItem.sections && stepItem.sections.map(section => {
                                                        return (<div className={`h-1 px-4 ml-2 ${section.step <= this.props.activeStep ? 'bg-green-600' : 'bg-gray-400'}`}></div>)
                                                    }) }
                                                </div>
                                            </div>
                                        )
                                    }) }
                                </div>
                           
                     
            </>
        )
    }
}

export default StepProgress;
