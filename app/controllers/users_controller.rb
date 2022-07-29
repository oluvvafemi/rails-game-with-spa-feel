class UsersController < ApplicationController
  def show
    @user_data = user_data

    @leaders = User.joins(:games).where('games.status': 'win').select('name, count(games.status)').group(:name).order(count: :desc)
                   .limit(10).as_json
  end

  private

  def user_data
    {
      wins: current_user.games.where('status = ?', 'win').count,
      losses: current_user.games.where('status = ?', 'loss').count,
      draws: current_user.games.where('status = ?', 'draw').count,
      games_played: current_user.games.where.not(status: '').count
    }
  end
end
