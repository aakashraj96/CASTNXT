class HomeController < ApplicationController
  def index
    if session.key?(:userEmail) and session.key?(:userType) and session.key?(:userName)
      redirect_to get_redirect_path
    end
  end
  
  def signup
    if new_user?(params[:email])
      create_user(params)
      currentUser = get_user(params[:email], params[:password])
      session[:userEmail] = currentUser.email
      session[:userType] = currentUser.user_type
      session[:userName] = currentUser.name
      session[:userId] = currentUser._id
      render json: {redirect_path: get_redirect_path}, status: 200
    else
      render json: {comment: "Email already exists!"}, status: 400
    end
  end
  
  def login
    if correct_user?(params)
      currentUser = get_user(params[:email], params[:password])
      session[:userEmail] = currentUser.email
      session[:userType] = currentUser.user_type
      session[:userName] = currentUser.name
      session[:userId] = currentUser._id
      render json: {redirect_path: get_redirect_path}, status: 200
    else
      render json: {comment: "User not found!"}, status: 400
    end
  end
  
  private
  
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
  
  def get_user email, password
    return Auth.find_by(:email => email, :password => password)
  end
  
  def create_user params
    user = Auth.create(name:params[:name], email:params[:email], password:params[:password], user_type:params[:type])
    if params[:type] == 'admin'
      Producer.create(_id:user._id, name:user.name, email:user.email)
    elsif params[:type] == 'client'
      Client.create(_id:user._id, name:user.name, email:user.email)
    end
  end

  def get_redirect_path
    if session[:userType] == 'admin'
      return '/admin'
    elsif session[:userType] == 'client'
      return '/client'
    else
      return '/user'
    end
  end
end