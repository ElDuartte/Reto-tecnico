class ApplicationController < ActionController::API
  before_action :authenticate_with_api_key

  def authenticate_with_api_key
    token = request.headers['Authorization']
    render json: { error: 'UNAUTHORIZED', message: 'Invalid API key' }, status: :unauthorized unless token == ENV['API_KEY']
  end
end
