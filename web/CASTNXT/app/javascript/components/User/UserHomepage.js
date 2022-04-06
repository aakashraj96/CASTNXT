import React, {Component} from 'react'
import Header from '../Navbar/Header';
import UserEvents from './UserEvents'

class UserHomepage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return(
            <div>
                <div>
                    <Header />
                </div>
                
                <div className="user-homepage">
                    <h1>User Homepage</h1>
                </div>
                
                <div>
                    <UserEvents />
                </div>
            </div>
        )
    }
}

export default UserHomepage