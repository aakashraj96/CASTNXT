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
    if is_user_logged_in?('USER')
      event = Event.find_by(:_id => params[:event_id])
      user = Talent.find_by(:_id => session[:userId])
      if "ACCEPTING".casecmp? event.status
        if is_new_slide?(event, user)
          create_slide(event, user, params)
          render json: {comment: 'Registered successfully!'}, status: 201
        else
          update_slide(event, user, params)
          render json: {comment: 'Updated registration!'}, status: 200
        end
      else
        render json: {comment: "Event is no longer accepting submissions!"}, status: 400
      end
    else
      render json: {redirect_path: '/'}, status: 403
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
    
    def get_event eventId
      return Event.find_by(:_id => eventId)
    end
    
    def get_user userId
      return Talent.find_by(:_id => userId)
    end
    
    def is_new_slide? event, user
      if Slide.where(:event_id => event._id, :talent_id => user._id).blank?
        return true
      end
      
      return false
    end
    
    def create_slide event, user, params
      Slide.create(:event_id => event._id, :talent_id => user._id, :curated => false, :submission_status => 'UNDER REVIEW', :data => params[:formData])
    end
    
    def update_slide event, user, params
      Slide.update_one(
        { event_id: event._id, talent_id: user._id },
        '$set' => { data: params[:formData]}
      )
    end
end
