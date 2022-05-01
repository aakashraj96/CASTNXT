class HomeController < ApplicationController
  # GET /
  def index
    if session.key?(:userEmail) and session.key?(:userType) and session.key?(:userName)
      redirect_to get_redirect_path
    end
  end
  
  # POST /home/signup
  def signup
    if new_user?(params[:email])
      create_user(params)
      currentUser = get_user(params[:email], params[:password])
      session[:userEmail] = currentUser.email
      session[:userType] = currentUser.user_type
      session[:userName] = currentUser.name
      session[:userId] = currentUser._id.to_str
      render json: {redirect_path: get_redirect_path, userId: currentUser._id.to_str}, status: 201
    else
      render json: {comment: "Email already exists!"}, status: 400
    end
  end
  
  # POST /home/login
  def login
    if correct_user?(params)
      currentUser = get_user(params[:email], params[:password])
      session[:userEmail] = currentUser.email
      session[:userType] = currentUser.user_type
      session[:userName] = currentUser.name
      session[:userId] = currentUser._id.to_str
      render json: {redirect_path: get_redirect_path, userId: currentUser._id.to_str}, status: 200
    else
      render json: {comment: "User not found!"}, status: 400
    end
  end
  
  private
  
  def get_user email, password
    return Auth.find_by(:email => email, :password => password)
  end
  
  def new_user? email
    if Auth.where(:email => email).blank?
      return true
    end
    
    return false
  end
  
  def correct_user? params
    if Auth.where(:email => params[:email], :password => params[:password]).present?
      return true
    end
    
    return false
  end
  
  def create_user params
    user = Auth.create(name:params[:name], email:params[:email], password:params[:password], user_type:params[:type])
    if "ADMIN".casecmp? params[:type]
      Producer.create(_id:user._id.to_str, name:user.name, email:user.email)
    elsif "CLIENT".casecmp? params[:type]
      Client.create(_id:user._id.to_str, name:user.name, email:user.email)
    else
      Talent.create(_id:user._id.to_str, name:user.name, email:user.email)
    end
  end

  def get_redirect_path
    if "ADMIN".casecmp? session[:userType]
      return '/admin'
    elsif "CLIENT".casecmp? session[:userType]
      return '/client'
    else
      return '/user'
    end
  end
end