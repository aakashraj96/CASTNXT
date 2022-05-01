class UserController < ApplicationController
  # GET /user
  def index
    authenticate_user!('USER')
    
    acceptingTableData = []
    submittedTableData = []
    
    events = Event.all
    events.each do |event|
      submittedFlag = 0
      
      object = {
        title: event.title,
        id: event._id.to_str
      }
      
      if user_slide_exists?(event._id.to_str, session[:userId])
        slide = get_slide(event._id.to_str, session[:userId])
        submittedFlag = 1
      end
      
      
      if submittedFlag == 0
        if "ACCEPTING".casecmp? event.status
          acceptingTableData << object
        end
      else
        if "ACCEPTING".casecmp? event.status
          object["accepting"] = true
          object["status"] = "SUBMITTED"
        else
          object["accepting"] = false
          object["status"] = event.status
        end
        
        submittedTableData << object
      end
    end
    @properties = {name: session[:userName], acceptingTableData: acceptingTableData, submittedTableData: submittedTableData}
  end
  
  private
  
  def get_slide eventId, userId
    return Slide.find_by(:event_id => eventId, :talent_id => userId)
  end
  
  def user_slide_exists? eventId, userId
    if Slide.where(:event_id => eventId, :talent_id => userId).present?
      return true
    end
    
    return false
  end
end
