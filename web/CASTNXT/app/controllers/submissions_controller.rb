class SubmissionsController < UserController
  # POST /user/events/:id
  def create
    if is_user_logged_in?
      
      render json: {redirect_path: '/user'}, status: 201
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end

  # PUT /user/events/:id
  def update
    if is_user_logged_in?
      
      render json: {redirect_path: '/user'}, status: 204
    else
      render json: {redirect_path: '/'}, status: 403
    end
  end

  

  private
    
end
