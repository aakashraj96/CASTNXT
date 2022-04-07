Rails.application.routes.draw do

  get '/logout', to: 'application#logout'
  
  root 'home#index'
  match '/home/login', :controller => 'home', :action => 'login', :via => :post
  match '/home/signup', :controller => 'home', :action => 'signup', :via => :post
  
  get '/user', to: 'user#index'
  
  get '/admin', to: 'admin#index'
  
  get '/client', to: 'client#index'
end
