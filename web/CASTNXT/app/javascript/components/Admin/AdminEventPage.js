import React, {Component} from "react"
import axios from "axios";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Header from "../Navbar/Header";
import AdminEventHome from "./AdminEventHome";
import AdminCreateStack from "./AdminCreateStack";
import AdminCreateClientStack from "./AdminCreateClientStack";
import AdminClientDecks from "./AdminClientDecks";
import AdminEventSummary from "./AdminEventSummary";
import AdminFinalizedCandidates from "./AdminFinalizedCandidates";
import AdminCreateWithFilter from "./AdminCreateWithFilter";

class AdminEventPage extends Component {
    constructor(props) {
        super(props)
        
        //console.log(`Props: ${JSON.stringify(properties)}`)
        this.state = {
            title: properties.data.title,
            description: properties.data.description,
            tabValue: 0
        }
    }
    
    handleTabChange = (e, newValue) => {
        this.setState({
            tabValue: newValue
        })
    }
    
    back = () => {
        window.location.href = "/admin"
    }

    render() {
        return(
            <div>
                <div>
                    <Header />
                </div>
                
                <div className="container">
                    <div className="user-events">
                        <h2> {this.state.title} </h2>
                        <h6> {this.state.description} </h6>
                        
                        <Button size="small" variant="outlined" style={{float: "right", marginRight: "1%"}} onClick={this.back}>Back to Forms</Button>

                        <div>
                            <Box sx={{ width: "100%", marginRight: "-2%" }}>
                              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                  <Tab label="Home" />
                                  <Tab label="Submitted Docs" />
                                  <Tab label="Selected Docs" />
                                  <Tab label="Client Decks" />
                                  <Tab label="Finalized Decks" />
                                  <Tab label="Summary" />
                                </Tabs>
                              </Box>
                              
                              {this.state.tabValue === 0 &&
                                  <div>
                                    <AdminEventHome properties={properties} />
                                  </div>
                              }
                              
                              {this.state.tabValue === 1 &&
                                  <div>
                                    <AdminCreateWithFilter properties={properties} />
                                  </div>
                                  /*<div>
                                    <AdminCreateStack properties={properties} />
                                  </div>*/
                              }
                              
                              {this.state.tabValue === 2 &&
                                  <div>
                                    <AdminCreateClientStack properties={properties} />
                                  </div>
                              }
                              
                              {this.state.tabValue === 3 &&
                                  <div>
                                    <AdminClientDecks properties={properties} />
                                  </div>
                              }
                              
                              {this.state.tabValue === 4 &&
                                  <div>
                                    <AdminFinalizedCandidates properties={properties} />
                                  </div>
                              }
                              
                              {this.state.tabValue === 5 &&
                                  <div>
                                    <AdminEventSummary properties={properties} />
                                  </div>
                              }
                            </Box>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminEventPage