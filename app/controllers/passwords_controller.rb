class PasswordsController < ApplicationController
    def index
        passwords = Password.all
        render json: passwords, except: [:created_at, :updated_at];
    end
end
