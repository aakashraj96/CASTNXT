class Auth
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name, type: String
  field :email, type: String
  field :password, type: String
  field :user_type, type: String
end