Rails.application.routes.draw do
  root 'users#show'

  get '/play', to: 'games#play', as: 'game'

  post '/round', to: 'games#round', as: 'round', defaults: { format: :json }
  devise_for :users, controllers: { registrations: 'registrations' }
end
