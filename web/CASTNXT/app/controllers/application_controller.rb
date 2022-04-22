class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    
    def authenticate_user! userType
        unless is_user_logged_in?(userType)
            redirect_to '/'
        end
    end
    
    def is_user_logged_in? userType
        flag = session.key?(:userEmail) and session.key?(:userType) and session.key?(:userName) and userType.casecmp? session[:userType]
        return flag
    end
    
    # GET /logout
    def logout
        reset_session
        render json: {redirect_path: '/'}, status: 200
    end
end
