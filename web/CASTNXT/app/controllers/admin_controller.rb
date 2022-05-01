class AdminController < ApplicationController
  # GET /admin
  def index
    authenticate_user!('ADMIN')
    
    tableData = []

    eventIds = get_admin_events(session[:userId])
    eventIds.each do |eventId|
      event = get_event(eventId)
      
      object = {
        id: event._id.to_str,
        title: event.title,
        status: event.status
      }
      
      tableData << object
    end
    @properties = {name: session[:userName], tableData: tableData}
  end
  
  private
  
  def get_event eventId
    return Event.find_by(:_id => eventId)
  end
  
  def get_admin_events clientId
    return Producer.find_by(:_id => clientId).event_ids
  end
end
