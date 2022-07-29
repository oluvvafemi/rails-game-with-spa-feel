class GameRound
  @@playerscenarios = { 'rock' => { 'paper' => [0, 1], 'scissors' => [1, 0] },
                        'paper' => { 'scissors' => [0, 1], 'rock' => [1, 0] },
                        'scissors' => { 'rock' => [0, 1], 'paper' => [1, 0] } }
  def initialize(player_selection, session)
    @player_selection = player_selection
    @game_session = session[:game]
    @game_id = session[:game_id]
  end

  def play
    @computer_selection = %w[rock paper scissors][rand(3)]
    status_codes = compare_choices(@player_selection, @computer_selection)
    [update_scores_and_round(status_codes), @computer_selection, @game_session, @game_status,
     round_commentaries(status_codes)]
  end

  private

  def compare_choices(player_selection, computer_selection)
    # [0,0]:draw [1,0]:player_win [0,1]:player_loss
    return [0, 0] if player_selection == computer_selection

    @@playerscenarios[player_selection][computer_selection]
  end

  def update_scores_and_round(status_codes)
    return false if @game_session['round'] >= 5

    @game_session['player_score'] += status_codes[0]
    @game_session['computer_score'] += status_codes[1]
    @game_session['round'] += 1

    @game_status = save_winner
    true
  end

  def round_commentaries(status_code)
    return 'played the same kind' if status_code == [0, 0]

    status_code == [0, 1] ? 'Bot won this round' : 'You won this round'
  end

  def save_winner
    return 'in progress' if @game_session['round'] < 5

    game = Game.find(@game_id)
    status = win_draw_loss
    game.status = status
    game.save

    status
  end

  def win_draw_loss
    return 'draw' if @game_session['player_score'] == @game_session['computer_score']

    @game_session['player_score'] > @game_session['computer_score'] ? 'win' : 'loss'
  end
end
