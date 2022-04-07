class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    
    def authenticate_user!
        if not is_user_logged_in?
            redirect_to '/'
        end
    end
    
    def is_user_logged_in?
        flag = session.key?(:userEmail) and session.key?(:userType) and session.key?(:userName)
        return flag
    end
    
    def logout
        reset_session
        render json: {redirect_path: '/'}, status: 200
    end
end
