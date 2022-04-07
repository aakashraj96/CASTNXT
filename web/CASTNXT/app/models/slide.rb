class Slide
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :event
  has_and_belongs_to_many :clients
  has_many :messages
  embeds_one :submission
  field :curated, type: Boolean
end