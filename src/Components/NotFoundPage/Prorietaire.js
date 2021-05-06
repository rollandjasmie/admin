import React,{Component } from 'react'
import history from "../../history";
import { userLogoutAttempt } from '../../redux/Auth/auth.action';
import { connect } from 'react-redux';
class Proprietaire extends Component {
    pro = () => {
        const async = async () => {
            await this.props.userLogoutAttempt()
            history.push('/signup')
        }
        async()
    }
    render(){
        return(
            <>
            <div className="w-full h-screen flex justify-center items-center">
     
          

            <div className=" w-2/3 flex items-center justify-center shadow-lg rounded bg-gray-100 h-64">
            <div>
              <p className="w-full  my-5 text-base font-medium text-center text-gray-800 ">Avant d'ajouter un hébergement, veuillez vous connecter en tant que propriétaire 
                en cliquant</p>

              <p className="w-full  text-xl text-center text-gray-500  cursor-pointer hover:text-yellow-600" onClick={this.pro}> ici</p>
            </div>
            </div>
          </div>
          </>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userLogoutAttempt: () => { dispatch(userLogoutAttempt()) }
    }
}
export default connect(null,mapDispatchToProps)(Proprietaire);
