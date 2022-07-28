class GamesController < ApplicationController
  before_action :setup_game, only: [:play]
  before_action :check_player_input, only: [:round]
  def play
    session[:game] = { 'round' => 0, 'player_score' => 0, 'computer_score' => 0 } unless session[:game]
    @current_game_data = session[:game]
  end

  def round
    render json: { "test endpoint": params[:player_selection] }, status: :ok
  end

  private

  def setup_game
    @game = current_user.games.create
    redirect_to root_path, alert: 'Unable to launch new game' unless @game.save
  end

  def check_player_input
    unless %w[rock paper scissors].include?(params[:player_selection])
      render json: { error: 'invalid input' }, status: :unprocessable_entity
    end
  end
end
