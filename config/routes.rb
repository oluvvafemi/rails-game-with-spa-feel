Rails.application.routes.draw do
  root 'users#show'

  get '/play', to: 'games#play', as: 'game'

  post '/round', to: 'games#round', as: 'round', defaults: { format: :json }
  get '/restart', to: 'games#restart', as: 'restart', defaults: { format: :json }

  devise_for :users, controllers: { registrations: 'registrations' }
end
