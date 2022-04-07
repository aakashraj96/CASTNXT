class AdminController < ApplicationController
  def index
    authenticate_user!
    
    @properties = {name: session[:userName]}
  end
end
