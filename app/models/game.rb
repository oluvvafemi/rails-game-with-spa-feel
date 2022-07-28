class Game < ApplicationRecord
  belongs_to :user
  before_create :generate_game_public_id

  private

  def generate_game_public_id
    self.public_id = SecureRandom.hex(6) unless self.class.exists?(public_id: public_id)
  end
end
