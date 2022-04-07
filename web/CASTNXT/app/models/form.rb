class Form
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :producer
  
  field :data, type: String
end