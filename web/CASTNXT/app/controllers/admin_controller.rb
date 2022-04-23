class AdminController < ApplicationController
  # GET /admin
  def index
    authenticate_user!('ADMIN')
    
    tableData = []

    events = Event.all
    events.each do |event|
      object = {
        id: event._id.to_str,
        title: event.title,
        status: event.status
      }
      
      tableData << object
    end
    @properties = {name: session[:userName], tableData: tableData}
  end
end
