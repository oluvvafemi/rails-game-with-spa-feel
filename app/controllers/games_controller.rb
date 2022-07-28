class GamesController < ApplicationController
  before_action :setup_game
  def play
    session[:game] = { 'round' => 0, 'player_score' => 0, 'computer_score' => 0 } unless session[:game]
    @current_game_data = session[:game]
  end

  private

  def setup_game
    @game = current_user.games.create
    redirect_to root_path, alert: 'Unable to launch new game' unless @game.save
  end
end
