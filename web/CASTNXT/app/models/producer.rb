class Producer
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name, type: String
  field :email, type: String
  
  has_many :events
  has_many :forms
end
