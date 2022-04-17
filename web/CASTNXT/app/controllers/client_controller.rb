class ClientController < ApplicationController
  def index
    authenticate_user!('client')
    
    tableData = []
    forms = Form.all
    forms.each do |form|
      event = Event.find_by(:_id => form.event_id)
      if event.client_ids.include? session[:userId]
        formData = JSON.parse(form.data)
        object = {
          event: formData['schema']['title'],
          eventId: form.event_id
        }
        form.event_id
          
        tableData << object
      end
    end
    
    @properties = {name: session[:userName], tableData: tableData}
  end
end
