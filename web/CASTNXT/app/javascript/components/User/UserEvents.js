import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import UserEventRegister from './UserEventRegister';

class UserEvents extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        
        let trows = [
            {
                event: 'Event 1',
                link: 'Link 1',
                status: 'Under Consideration'
            },
            {
                event: 'Event 2',
                link: 'Link 2',
                status: 'Under Consideration'
            },
            {
                event: 'Event 3',
                link: 'Link 3',
                status: 'Under Consideration'
            },
        ]
        
        return(
            <div className="container user-events">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <table>
                            <thead>
                                <tr>
                                    <td>Event</td>
                                    <td>Link</td>
                                    <td>Status</td>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {trows.map((val, key) => {
                                        return(
                                            <tr key={key}>
                                                <td>{val.event}</td>
                                                <td>
                                                    <Link to={{
                                                                pathname: "/user/event",
                                                                state: { eventId: 'id1' },
                                                              }}>{val.link}</Link>
                                                </td>
                                                <td>{val.status}</td>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserEvents