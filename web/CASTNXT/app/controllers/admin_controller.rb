class AdminController < ApplicationController
  def index
    authenticate_user!('admin')
    
    tableData = []
    forms = Form.all
    forms.each do |form|
      event = Event.find_by(:_id => form.event_id)
      formData = JSON.parse(form.data)
      object = {
        event: formData['schema']['title'],
        eventId: form.event_id,
        status: event.status
      }
      form.event_id
        
      tableData << object
    end
    
    @properties = {name: session[:userName], tableData: tableData}
  end
end
