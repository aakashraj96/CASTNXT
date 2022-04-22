class UserController < ApplicationController
  # GET /user
  def index
    authenticate_user!('USER')
    
    acceptingTableData = []
    submittedTableData = []
    
    events = Event.all
    events.each do |event|
      submittedFlag = 0
      slides = get_slides(event._id.to_str)
      
      object = {
        title: event.title,
        id: event._id.to_str
      }
      
      slides.each do |slide|
        if slide.submission.talent_id.to_str.casecmp? session[:userId]
          submittedFlag = 1
          object["status"] = slide.submission.status
          break
        end
      end
      
      if submittedFlag == 0
        if "ACCEPTING".casecmp? event.status
          acceptingTableData << object
        end
      else
        if "ACCEPTING".casecmp? event.status
          object["accepting"] = true
        end
        
        submittedTableData << object
      end
    end
    @properties = {name: session[:userName], acceptingTableData: acceptingTableData, submittedTableData: submittedTableData}
  end
  
  private
  
  def get_slides eventId
    return Slide.where(:event_id => eventId)
  end
end
