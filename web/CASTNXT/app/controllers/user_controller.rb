class UserController < ApplicationController
  def index
    authenticate_user!('user')
    
    acceptingTableData = []
    submittedTableData = []
    
    forms = Form.all
    forms.each do |form|
      submittedFlag = 0
      event = Event.find_by(:_id => form.event_id)
      slides = Slide.where(:event_id => form.event_id)
      
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
end
