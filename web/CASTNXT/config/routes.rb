Rails.application.routes.draw do

  # Latest End points
  root 'home#index'
  
  match '/home/login', :controller => 'home', :action => 'index', :via => :post
  match '/home/signup', :controller => 'home', :action => 'create', :via => :post
  
  get '/user', to: 'home#index', as: 'user'
  get '/admin', to: 'home#index', as: 'admin'
  
  # get '/login', to: 'home#index', as: 'index'
  # get '/sign_up', to: 'home#create_user', as: 'create_user'
  
  # Old End points
  # get '/:id/preview', to: 'gforms#preview', as: 'preview'
  # get '/:id/edit_form', to: 'gforms#edit_form', as: 'edit_form'
  # get '/:id/view_responses', to: 'gforms#view_responses', as: 'view_responses'
  
  # resources :gforms
  #get 'users/profile'
  #get 'users/designers'
  #get 'users/admin'
  
  # get '/:id/profile', to: 'users#profile', as: 'user_profile'
  # get '/:id/designers', to: 'users#designers', as: 'user_designer'
  # get '/:id/admin', to: 'users#admin', as: 'user_admin'
  # map '/' to be a redirect to '/movies'
  #root :to => redirect('/users/new')
end
