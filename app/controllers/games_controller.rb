class GamesController < ApplicationController
  before_action :setup_game
  def play; end

  private

  def setup_game
    @game = current_user.games.create
    redirect_to root_path, alert: 'Unable to launch new game' unless @game.save
  end
end
