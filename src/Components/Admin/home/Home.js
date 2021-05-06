import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import All from '../users/All'
    
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
        return (<>
       
                <All/>
        
            </>
        );
    }
}

export default Home;