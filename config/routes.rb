Rails.application.routes.draw do
  root 'users#show'

  get '/play', to: 'games#play', as: 'game'

  devise_for :users, controllers: { registrations: 'registrations' }
end
