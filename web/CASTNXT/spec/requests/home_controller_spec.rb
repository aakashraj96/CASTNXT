require 'rails_helper'

RSpec.describe HomeController, type: :request do
  describe "GET /index" do
    it "returns a 200" do
      get '/'
      expect(response).to have_http_status(:ok)
    end
    
  end
  
  describe "POST /home/signup" do
    it "returns redirect path on successful signup" do
      post '/home/signup', :params => { :email => "test_email@test.com", :password => "pass" }
      parsed_body = JSON.parse(response.body)
      expect(parsed_body["redirect_path"]).to eq "/user"
    end
    
    it "returns an error if email already exists" do
      post '/home/signup', :params => { :email => "test_email@test.com", :password => "pass" }
      post '/home/signup', :params => { :email => "test_email@test.com", :password => "pass" }
      parsed_body = JSON.parse(response.body)
      expect(parsed_body["comment"]).to eq "Email already exists!"
    end
    
  end
  
  describe "POST /home/login" do
    it "returns redirect path on successful login" do
      post '/home/signup', :params => { :email => "test_email@test.com", :password => "pass" }
      post '/home/login', :params => { :email => "test_email@test.com", :password => "pass" }
      parsed_body = JSON.parse(response.body)
      expect(parsed_body["redirect_path"]).to eq "/user"
    end
    
    it "returns an error if user credentials don't match" do
      post '/home/login', :params => { :email => "test_email@test.com", :password => "pass" }
      expect(response).to have_http_status(400)
    end
    
  end
end
