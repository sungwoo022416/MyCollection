Rails.application.routes.draw do
  resources :moods
  resources :weathers
  resources :locations
  resources :users
  resources :passwords
  resources :to_do_lists
  resources :stories
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
