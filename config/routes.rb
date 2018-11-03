Rails.application.routes.draw do
  namespace :api do
    resources :items, except: :show
  end

  get '*other', to: 'static#index'
end
