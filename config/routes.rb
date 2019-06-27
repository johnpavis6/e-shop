Rails.application.routes.draw do
  get 'welcome/index'
  post 'products/create'
  get 'products/read'
  post 'products/update'
  post 'products/delete'
  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
