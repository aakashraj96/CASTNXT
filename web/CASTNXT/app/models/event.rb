class Event
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :form
  belongs_to :producer
  has_and_belongs_to_many :clients
  has_many :slides
  has_many :negotiations
  
  field :status, type: String
  field :title, type: String
  field :description, type: String
end