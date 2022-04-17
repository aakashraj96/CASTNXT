class Event
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :form
  belongs_to :producer
  has_and_belongs_to_many :clients
  has_many :slides
  
  field :status, type: String
end