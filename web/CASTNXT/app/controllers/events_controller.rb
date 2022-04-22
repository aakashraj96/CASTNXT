class EventsController < ApplicationController

  # GET /events or /events.json
  def index
    if is_user_logged_in?
      if "ADMIN".casecmp? session[:userType]
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
        render json: {tableData: tableData}, status: 200
      elsif "CLIENT".casecmp? session[:userType]
        # perform client action
      else
        # perform user action
      end
    else
      user_event
    end
  end

  # GET /events/1 or /events/1.json
  def show
    if "ADMIN".casecmp? session[:userType]
      # perform admin action
    elsif "CLIENT".casecmp? session[:userType]
      # perform client action
    else
      user_event
    end
  end

  # GET /events/new
  def new
    authenticate_user!('admin')
    @event = Event.new
    clientsInfo = []
    formIds = []
    clients = Clients.all.to_a
    clients.each do |client|
      data = {
        id: client._id,
        name: client.name
      }
      clientsInfo << data
    end
    forms = Form.where(:producer_id => session[:userId])
    forms.each do |form|
      formIds << form._id.to_str
    end
    @properties = {formIds: formIds, clientsInfo: clientsInfo}
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events or /events.json
  def create
    # only admin allowed to create a new event
    if is_user_logged_in?('ADMIN')
      @event = Event.new(event_params)
      if @event.save
        # add event to producer
        @producer = Producer.find_by(:_id => params[:producer_id])
        @producer.eventIds << @event._id.to_str
        @producer.save
        
        # add event to client
        params[:client_ids].each do |clientId|
          @client = Client.find_by(:_id => clientId)
          @client.eventIds << @event._id.to_str
          @client.save
        end
        
        # add event to form
        @form = Form.find_by(:_id => params[:form_id])
        @form.event_ids << @event._id.to_str
        @form.save
        
        #render
        render :show, status: 201, location: @event
      else
        render json: @event.errors, status: 400
      end
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end

  private
  
  def user_event
    authenticate_user!('USER')
    
    eventId = params[:id]
    if unknown_event?(eventId)
      return
    end
    
    form = get_form(eventId)
    slides = get_slides(eventId)
    
    data = JSON.parse(form.data)
    data["id"] = eventId
    
    slides.each do |slide|
      if slide.submission.talent_id.to_str.casecmp? session[:userId]
        data["formData"] = JSON.parse(slide.submission.data)
        break
      end
    end
    
    @properties = {name: session[:userName], data: data}
  end
  
  def unknown_event? eventId
    if Form.where(:event_id => eventId).blank?
      render :file => "#{Rails.root}/public/404.html",  layout: false, status: :not_found
      return true
    else
      return false
    end
  end
  
  def get_form eventId
    return Form.find_by(:event_id => eventId)
  end
  
  def get_slides eventId
    return Slide.where(:event_id => eventId)
  end
end
