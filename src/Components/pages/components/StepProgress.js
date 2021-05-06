import React, { Component } from 'react';

class StepProgress extends Component {
    render() {
        return (
            <>
                <nav className="step lg:block md:hidden sm:hidden bg-blue-500">
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-center">
                        <div className="relative flex items-center justify-between h-16">
                       
                        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                    
                            <div className="hidden sm:block">
                                <div className="flex justify-center lg:block md:hidden sm:hidden">
                                    { this.props.stepList && this.props.stepList.map(stepItem => {
                                        return (
                                            <div className="  mr-10 text-center  ml-10 py-2 rounded-md text-sm font-medium leading-5 text-gray-300  focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                                               <label className="h-10 flex items-center justify-center">
                                                { stepItem.title }
                                                </label>
                                                <div className="flex mt-2 justify-center items-center">
                                                    { stepItem.sections && stepItem.sections.map(section => {
                                                        return (<div className={`h-1 px-4 ml-2 ${section.step <= this.props.activeStep ? 'bg-green-600' : 'bg-gray-400'}`}></div>)
                                                    }) }
                                                </div>
                                            </div>
                                        )
                                    }) }
                                </div>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                </nav> 
            </>
        )
    }
}

export default StepProgress;
