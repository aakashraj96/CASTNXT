import React, {Component} from 'react'
import { Paper } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';


class AdminEventSummary extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            properties: props.properties,
            slides: props.properties.data.slides,
            eventTalent: [],
            rows: [],
            columns: []
        }
    }
    
    findAssignedClients = (slideId) => {
      let clients = this.props.properties.data.clients
      let assignedClients = ''
      for(var key in clients) {
        if(clients[key].finalizedIds.indexOf(slideId) !== -1) {
          if (assignedClients === '') {
            assignedClients = clients[key].name
          } else {
            assignedClients = assignedClients + ', ' + clients[key].name
          }
        }
      }
      return assignedClients
    }
    
    constructTableData = (eventTalent) => {
      let columns = [
        {field: 'clients', headerName: 'Clients assigned', minWidth: 200}
      ]
      let rows = []
      let schema = this.props.properties.data.schema.properties
      Object.keys(schema).forEach(key => {
        let existingColumn = columns.find(column => column.field === key)
        if (!existingColumn) {
          columns.push({field: key, headerName: schema[key].title, minWidth: 150})
        }
      })
      eventTalent.forEach((talentData, index) => {
        let row = {}
        row['id'] = index + 1
        row['clients'] = this.findAssignedClients(talentData.id)
        columns.forEach((column) => {
          if(column.field !== 'name' && column.field !== 'clients') {
            if (talentData.formData[column.field]) {
              row[column.field] = talentData.formData[column.field]
            } else {
              row[column.field] = ''
            }
          }
        })
        if (row['clients'] !== '') {
          rows.push(row) 
        }
      })
      return [rows,columns]
    }
    
    componentDidMount() {
        let slides = this.props.properties.data.slides
        let eventTalent = []

        for(var key in slides) {
            eventTalent.push({
                id: key,
                name: slides[key].talentName,
                curated: slides[key].curated,
                formData: slides[key].formData
            })
        }
        eventTalent = eventTalent.filter(row => row['curated'] === true)
        let [rows,columns] = this.constructTableData(eventTalent)
        console.log(columns)
        this.setState({
            eventTalent: eventTalent,
            rows: rows,
            columns: columns
        })
    }
    
    render() {
        return(
            <div>
                <h4 style={{marginTop: '10px'}}>Event Summary</h4>
                
                <div>
                  <div className="col-md-8 offset-md-2" style={{marginTop: '10px'}}>
                    <Paper>
                      <DataGrid
                        rows={this.state.rows}
                        columns={this.state.columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight
                      />
                    </Paper>
                  </div>
                    
                </div>
            </div>    
        )
    }
}

export default AdminEventSummary