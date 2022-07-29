class GamesController < ApplicationController
  before_action :setup_game, only: [:play]
  before_action :check_player_input, only: [:round]
  def play
    session[:game] = { 'round' => 0, 'player_score' => 0, 'computer_score' => 0 }
    @current_game_data = session[:game]
  end

  def round
    round_result = GameRound.new(params[:player_selection], session).play
    session[:game] = round_result[2]
    if round_result[0]
      render json: { "computer_selection": round_result[1], "game_data": session[:game], commentary: round_result[4],
                     "game_status": round_result[3] }
    else
      render json: { error: "can't play more than 5 rounds" }, status: :unprocessable_entity
    end
  end

  def restart
    render json: { info: 'starting new session' }, location: game_path, status: :found
  end

  private

  def setup_game
    @game = current_user.games.create
    game_saved = @game.save
    session[:game_id] = @game.id if game_saved

    redirect_to root_path, alert: 'Unable to launch new game' unless game_saved
  end

  def check_player_input
    unless %w[rock paper scissors].include?(params[:player_selection])
      render json: { error: 'invalid input' }, status: :unprocessable_entity
    end
  end
end
