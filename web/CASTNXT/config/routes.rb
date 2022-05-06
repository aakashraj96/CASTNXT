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
      resources :negotiations
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
    resources :events do
      resources :negotiations
    end
  end
  
  # resources :events
  get '/logout', to: 'application#logout'
  
  root 'home#index'
  match '/home/login', :controller => 'home', :action => 'login', :via => :post
  match '/home/signup', :controller => 'home', :action => 'signup', :via => :post
  
end
