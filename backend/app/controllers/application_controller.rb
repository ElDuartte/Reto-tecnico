class ApplicationController < ActionController::API
  before_action :authenticate_with_api_key

  def authenticate_with_api_key
    token = request.headers['Authorization']
    unless token == ENV['API_KEY']
      render json: { error: 'UNAUTHORIZED', message: 'Invalid API key' }, status: :unauthorized
    end
  end
end
