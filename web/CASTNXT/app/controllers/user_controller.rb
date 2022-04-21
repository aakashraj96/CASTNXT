class UserController < ApplicationController
  # GET /user
  def index
    authenticate_user!('user')
    
    acceptingTableData = []
    submittedTableData = []
    
    forms = Form.all
    forms.each do |form|
      submittedFlag = 0
      event = get_event(form.event_id)
      slides = get_slides(form.event_id)
      
      formData = JSON.parse(form.data)
      object = {
        event: formData['schema']['title'],
        eventId: form.event_id
      }
      
      slides.each do |slide|
        if slide.submission.talent_id == session[:userId]
          submittedFlag = 1
          object["status"] = slide.submission.status
          break
        end
      end
      
      if submittedFlag == 0
        if event.status == 'ACCEPTING'
          acceptingTableData << object
        end
      else
        if event.status == 'ACCEPTING'
          object["accepting"] = true
        end
        
        submittedTableData << object
      end
    end
    @properties = {name: session[:userName], acceptingTableData: acceptingTableData, submittedTableData: submittedTableData}
  end
  
  private
  
  def get_event eventId
    return Event.find_by(:_id => eventId)
  end
  
  def get_slides eventId
    return Slide.where(:event_id => eventId)
  end
end
