class Medium
  include Mongoid::Document
  include Mongoid::Timestamps
  
  belongs_to :submission
  
  field :attachments, type: Array 
end
