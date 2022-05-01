class SlidesController < ApplicationController
  before_action :set_slide, only: %i[ show edit update destroy ]

  # GET /slides or /slides.json
  def index
    @slides = Slide.all
  end

  # GET /slides/1 or /slides/1.json
  def show
  end

  # GET /slides/new
  def new
    @slide = Slide.new
  end

  # GET /slides/1/edit
  def edit
  end

  # POST /slides or /slides.json
  def create
    if "ADMIN".casecmp? session[:userType]
      create_admin_slide
    elsif "CLIENT".casecmp? session[:userType]
      # perform client action
    else
      create_user_slide
    end
  end

  # PATCH/PUT /slides/1 or /slides/1.json
  def update
    respond_to do |format|
      if @slide.update(slide_params)
        format.html { redirect_to slide_url(@slide), notice: "Slide was successfully updated." }
        format.json { render :show, status: :ok, location: @slide }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @slide.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /slides/1 or /slides/1.json
  def destroy
    @slide.destroy

    respond_to do |format|
      format.html { redirect_to slides_url, notice: "Slide was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_slide
    @slide = Slide.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def slide_params
    params.fetch(:slide, {})
  end
    
  def create_user_slide
    if is_user_logged_in?('USER')
      eventId = params[:event_id]
      talentId = session[:userId]
      data = params[:formData]
      event = get_event(eventId)
      
      if "ACCEPTING".casecmp? event.status
        if is_new_slide?(eventId, talentId)
          create_slide(eventId, talentId, data)
          render json: {comment: 'Registered successfully!'}, status: 201
        else
          update_slide(eventId, talentId, data)
          render json: {comment: 'Updated registration!'}, status: 200
        end
      else
        render json: {comment: "Event is no longer accepting submissions!"}, status: 400
      end
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end
  
  def create_admin_slide
    if is_user_logged_in?('ADMIN')
      eventId = params[:event_id]
      event = get_event(eventId)
      
      update_event_clients(event, params[:clients])
      update_event_slides(params[:slides])
      
      render json: {comment: 'Updated event decks!'}, status: 200
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end
    
  def update_event_slides data
    data.keys.each do |slideId|
      slide = get_slide(slideId)
      slide.update(:curated => data[slideId][:curated], :data => data[slideId][:formData])
    end
  end
  
  def update_event_clients event, data
    eventSlideIds = get_event_slide_ids(event)
    clients = Client.all
    
    clients.each do |client|
      clientId = client._id.to_str
      otherEventSlides = []
      
      client.slide_ids.each do |slideId|
        unless eventSlideIds.include? slideId.to_str
          otherEventSlides << slideId.to_str
        end
      end
      
      clientEventIds = client.event_ids
      clientEventIds.delete(event._id)
      if !data[clientId][:slideIds].empty?
        clientEventIds << event._id
      end
      clientSlideIds = otherEventSlides + data[clientId][:slideIds]
      client.update(:slide_ids => clientSlideIds, :event_ids => clientEventIds)
    end
  end
  
  def get_event_slide_ids event
    eventSlideIds = []
    
    event.slide_ids.each do |slideId|
      eventSlideIds << slideId.to_str
    end
    
    return eventSlideIds
  end
  
  def get_event eventId
    return Event.find_by(:_id => eventId)
  end
  
  def get_slide slideId
    return Slide.find_by(:_id => slideId)
  end
  
  def get_talent_slide eventId, talentId
    return Slide.find_by(:event_id => eventId, :talent_id => talentId)
  end
  
  def get_client clientId
    return Client.find_by(:_id => clientId)
  end
  
  def create_slide eventId, talentId, data
    Slide.create(:event_id => eventId, :talent_id => talentId, :curated => false, :submission_status => 'UNDER REVIEW', :data => data)
  end
  
  def update_slide eventId, talentId, data
    slide = get_talent_slide(eventId, talentId)
    slide.update(:data => data)
  end
  
  def is_new_slide? eventId, talentId
    if Slide.where(:event_id => eventId, :talent_id => talentId).blank?
      return true
    end
    
    return false
  end
  
end
