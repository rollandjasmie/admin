import React, { Component } from 'react'
import axios from 'axios';
import ReactLoading from 'react-loading';
import $ from 'jquery';

class invitation extends Component {
    state = {  }
    async componentDidMount() {
        const { match: { params } } = this.props
        await axios.post(`/invitation/${params.user}/${params.logement_id}/${params.date}`).then(response=>{
            this.setState({ response: response.data.reponse})
            if (response) {
                setTimeout(() => {
                    this.props.history.push('/');
                }, 15000)
            }
        })
    }
    render() {
        var sec = 15;
        function pad(val) { return val > 9 ? val : "0" + val; }
        setInterval(function () {
            $("#seconds").html(pad(--sec % 60));
        }, 1000);
        return (
            <div>
                {this.state.response?(
                    <div>
                        {this.state.response}<br />
                        Retour à la page d'accueil dans:
                        <span id="seconds"></span>
                    </div>
                ) : (<ReactLoading  />
)}
            </div>
        );
    }
}

export default invitation