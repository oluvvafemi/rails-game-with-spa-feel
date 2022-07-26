Rails.application.routes.draw do
  devise_for :users

  root 'users#show'

  get '/play', to: 'game#play', as: 'game'
end
