class GamesController < ApplicationController
  before_action :setup_game, only: [:play]
  before_action :check_player_input, only: [:round]
  def play
    session[:game] = { 'round' => 0, 'player_score' => 0, 'computer_score' => 0 }
    @current_game_data = session[:game]
  end

  def round
    round_result = GameRound.new(params[:player_selection], session[:game]).play
    session[:game] = round_result[2]
    if round_result[0]
      render json: { "computer_selection": round_result[1], "game_data": session[:game], commentary: round_result[3] },
             status: :ok
    else
      render json: { error: "can't play more than 5 rounds per game" }, status: :unprocessable_entity
    end
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
