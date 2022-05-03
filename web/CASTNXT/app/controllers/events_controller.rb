class EventsController < ApplicationController

  # GET /events/1 or /events/1.json
  def show
    if "ADMIN".casecmp? session[:userType]
      admin_event
    elsif "CLIENT".casecmp? session[:userType]
      client_event
    else
      user_event
    end
  end

  # GET /events/new
  def new
    unless is_user_logged_in?('ADMIN')
      return redirect_to root_path
    end
    
    @event = Event.new
    formIds = []
    forms = Form.where(:producer_id => session[:userId])
    forms.each do |form|
      formIds << form._id.to_str
    end
    @properties = {name: session[:userName], formIds: formIds}
  end

  # GET /events/1/edit
  def edit
    
  end
  
  # PUT /events/1/
  def update
    if is_user_logged_in?('ADMIN')
      eventId = params[:id]
      event = get_event(eventId)
      
      update_event_status(event, params[:status])
      
      render json: {comment: 'Updated Event Status!'}, status: 200
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end

  # POST /events or /events.json
  def create
    # only admin allowed to create a new event
    if is_user_logged_in?('ADMIN')
      @event = Event.new(form_id:params[:form_id], producer_id:params[:producer_id], status:params[:status], title:params[:title], description:params[:description])
      if @event.save
        #render
        # render :show, status: 201, location: @event
        render json: {redirect_path: '/admin'}, status: 201
      else
        render json: @event.errors, status: 400
      end
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end

  private
  
  def user_event
    unless is_user_logged_in?('USER')
      return redirect_to root_path
    end
    
    eventId = params[:id]
    if unknown_event?(eventId)
      return
    end
    
    event = get_event(eventId)
    form = get_form(event.form_id)
      
    data = JSON.parse(form.data)
    data["id"] = eventId
    data["title"] = event.title
    data["description"] = event.description
    
    if talent_slide_exists?(eventId, session[:userId])
      slide = get_talent_slide(eventId, session[:userId])
      data["formData"] = JSON.parse(slide.data)
    end
    
    @properties = {name: session[:userName], data: data}
  end
  
  def admin_event
    unless is_user_logged_in?('ADMIN')
      return redirect_to root_path
    end
    
    eventId = params[:id]
    if unknown_event?(eventId)
      return
    end
    
    event = get_event(eventId)
    form = get_form(event.form_id)
    
    data = JSON.parse(form.data)
    data[:id] = eventId
    data[:title] = event.title
    data[:description] = event.description
    data[:status] = event.status
    
    data[:clients] = build_admin_event_clients(event)
    data[:slides] = build_admin_event_slides(event)
    
    @properties = {name: session[:userName], data: data}
  end
  
  def client_event
    unless is_user_logged_in?('CLIENT')
      return redirect_to root_path
    end
    
    eventId = params[:id]
    if unknown_event?(eventId)
      return
    end
    
    event = get_event(eventId)
    client = get_client(session[:userId])
    form = get_form(event.form_id)
      
    data = JSON.parse(form.data)
    data[:id] = eventId
    data[:title] = event.title
    data[:description] = event.description
    data[:status] = event.status
    
    data[:slides] = build_client_event_slides(event, client)
    
    @properties = {name: session[:userName], data: data}
  end
  
  def unknown_event? eventId
    if Event.where(:_id => eventId).blank?
      render :file => "#{Rails.root}/public/404.html",  layout: false, status: :not_found
      return true
    else
      return false
    end
  end
  
  def build_admin_event_clients event
    clientsObject = {}
    eventSlideIds = get_event_slide_ids(event)
    
    clients = Client.all
    clients.each do |client|
      clientObject = {}
      clientObject[:name] = client.name
      clientObject[:slideIds] = []
      
      client.slide_ids.each do |slideId|
        if eventSlideIds.include? slideId.to_str
          clientObject[:slideIds] << slideId.to_str
        end
      end
      
      clientsObject[client._id.to_str] = clientObject
    end
    
    return clientsObject
  end
  
  def build_admin_event_slides event
    slidesObject = {}
    event.slide_ids.each do |slideId|
      slide = get_slide(slideId)
      talent = get_talent(slide.talent_id)
      
      slideObject = {}
      slideObject[:talentName] = talent.name
      slideObject[:formData] = JSON.parse(slide.data)
      slideObject[:curated] = slide.curated
      
      slidesObject[slideId.to_str] = slideObject
    end
    
    return slidesObject
  end
  
  def build_client_event_slides event, client
    slidesObject = {}
    
    (event.slide_ids & client.slide_ids).each do |slideId|
      slide = get_slide(slideId)
      talent = get_talent(slide.talent_id)
      
      slideObject = {}
      slideObject[:talentName] = talent.name
      slideObject[:formData] = JSON.parse(slide.data)
      
      slidesObject[slideId.to_str] = slideObject
    end
    
    return slidesObject
  end
  
  def get_event_slide_ids event
    eventSlideIds = []
    
    event.slide_ids.each do |slideId|
      eventSlideIds << slideId.to_str
    end
    
    return eventSlideIds
  end
  
  def update_event_status event, status
    event.update(:status => status)
  end
  
  def get_event eventId
    return Event.find_by(:_id => eventId)
  end
  
  def get_form formId
    return Form.find_by(:_id => formId)
  end
  
  def get_client clientId
    return Client.find_by(:_id => clientId)
  end
  
  def get_talent talentId
    return Talent.find_by(:_id => talentId)
  end
  
  def get_slide slideId
    return Slide.find_by(:_id => slideId)
  end
  
  def get_talent_slide eventId, talentId
    return Slide.find_by(:event_id => eventId, :talent_id => talentId)
  end
  
  def talent_slide_exists? eventId, talentId
    if Slide.where(:event_id => eventId, :talent_id => talentId).present?
      return true
    end
    
    return false
  end
  
  # Only allow a list of trusted parameters through.
  def event_params
    params.fetch(:event, {})
  end
end
