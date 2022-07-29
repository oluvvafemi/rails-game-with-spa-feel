class UsersController < ApplicationController
  def show
    @wins = current_user.games.where('status = ?', 'win').count
    @losses = current_user.games.where('status = ?', 'loss').count
    @draws = current_user.games.where('status = ?', 'draw').count
    @games_played = current_user.games.where.not(status: '').count
  end
end
