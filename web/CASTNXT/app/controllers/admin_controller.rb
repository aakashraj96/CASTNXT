class AdminController < ApplicationController
  # GET /admin
  def index
    authenticate_user!('admin')
    
    tableData = []

    eventIds = Producer.find_by(:_id => session[:userId]).event_ids
    eventIds.each do |eventId|
      event = Event.find_by(:_id => eventId)
      object = {
        id: eventId,
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
end
