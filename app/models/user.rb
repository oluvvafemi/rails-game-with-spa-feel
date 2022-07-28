class User < ApplicationRecord
  has_many :games, dependent: :destroy
  validates :name, presence: true
  validates :name, length: { minimum: 4 }
  validates :name, uniqueness: true
  devise :database_authenticatable, :registerable, :trackable,
         :recoverable, :rememberable, :validatable, :confirmable
end
