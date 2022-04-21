class Submission
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :talent
  belongs_to :slide
  has_many :media
  
  field :data, type: String
  field :status, type: String
end
