Rails.application.routes.draw do

  resources :forms
  resources :slides

  get '/user', to: 'user#index'
  get '/admin', to: 'admin#index'
  get '/client', to: 'client#index'
  
  scope :admin do 
    # TODO: update the except block based on actions configured
    resources :events do
      resources :slides
    end
    resources :forms, :except => [:edit, :update]
  end
  
  scope :user do 
    # TODO: update the except block based on actions configured
    resources :events do
      resources :slides
    end
  end
  
  scope :client do 
    # TODO: update the except block based on actions configured
    resources :events
  end
  
  # resources :events
  get '/logout', to: 'application#logout'
  
  root 'home#index'
  match '/home/login', :controller => 'home', :action => 'login', :via => :post
  match '/home/signup', :controller => 'home', :action => 'signup', :via => :post
  
  get '/user', to: 'user#index'
  match '/user/events', :controller => 'user', :action => 'events', :via => :get
  
  get '/admin', to: 'admin#index'
  match '/admin/events', :controller => 'admin', :action => 'events', :via => :get
  match '/admin/create-event', :controller => 'admin', :action => 'create_event', :via => :get
  match '/admin/create-master-stack', :controller => 'admin', :action => 'index', :via => :get
  match '/admin/create-client-stack', :controller => 'admin', :action => 'index', :via => :get
  # match '/admin/event/:id', :controller => 'admin', :action => 'index', :via => :get
  
  get '/client', to: 'client#index'
  match '/client/events', :controller => 'client', :action => 'events', :via => :get
  match '/client/event/:id', :controller => 'client', :action => 'index', :via => :get
  
end
