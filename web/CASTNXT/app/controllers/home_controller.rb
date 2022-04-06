class HomeController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def index
    Rails.logger.debug(User.column_names)
    # if session.key?(:userEmail) and session.key?(:userType) and session.key?(:userName)
    #   session_redirect
    # end
    
    # Rails.logger.debug(params)
    Rails.logger.debug(request.params[:params])
    
    if request.params.key?(:params)
      params = request.params[:params]
      
      if params.key?(:email) and params.key?(:password)
        Rails.logger.debug("HERE")
        if correct_user?(params)
          currentUser = User.find_by(:email => params[:email], :password => params[:password])
          session[:userEmail] = params[:email]
          session[:userType] = currentUser.userType
          session[:userName] = currentUser.name
          session_redirect
        else
          render json: {comment: "User not found!"}, status: 400
        end
      end
    end
    
    
    
  end
  
  def create
    if new_user?(params[:email])
      create_user(params)
      session[:userEmail] = params[:email]
      session[:userType] = params[:type]
      session_redirect
    else
      render json: {comment: "Email already exists!"}, status: 400
    end
  end
  
  private
  
  def new_user? email
    if User.where(:email => email).blank?
      return true
    end
    
    return false
  end
  
  def correct_user? params
    if User.where(:email => params[:email], :password => params[:password]).present?
      return true
    end
    
    return false
  end
  
  def create_user params
    User.create(name:params[:name], email:params[:email], password:params[:password], userType:params[:type])
  end

  def session_redirect
    render json: {userType: session[:userType]}, status: 200
  end
end