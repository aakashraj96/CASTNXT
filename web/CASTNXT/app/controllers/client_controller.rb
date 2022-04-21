class ClientController < ApplicationController
  # GET /client
  def index
    authenticate_user!('client')
    
    tableData = []
    forms = Form.all
    forms.each do |form|
      event = get_event(form.event_id)
      if event.client_ids.include? session[:userId]
        formData = JSON.parse(form.data)
        
        object = {
          event: formData['schema']['title'],
          eventId: form.event_id
        }
          
        tableData << object
      end
    end
    
    @properties = {name: session[:userName], tableData: tableData}
  end
  
  private
  
  def get_event eventId
    return Event.find_by(:_id => eventId)
  end
end
