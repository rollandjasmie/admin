import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
    
class Home extends Component {
    state = {}
    componentDidMount() {
        axios.get('/user/all').then(response => (
            this.setState({ users: response.data.users })
        ))
        axios.get('/admin/logements/all').then(response => (
            this.setState({ logements: response.data.logements })
        ))
    }
    render() {
        return (
            <div>
                <h1> Runbnb </h1>
                <div>
                    <NavLink to={'/user/all'}>
                        User All
                    </NavLink>
                    {this.state.users && this.state.users.length}
                </div>
                <div>
                    <NavLink to={'/logements/all'}>
                        logements All
                    </NavLink>
                    {this.state.logements && this.state.logements.length}
                </div>
            </div>
        );
    }
}

export default Home;