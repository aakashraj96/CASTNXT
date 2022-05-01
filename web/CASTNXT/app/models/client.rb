class Client
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name, type: String
  field :email, type: String
  
  has_and_belongs_to_many :events
  has_and_belongs_to_many :slides
end