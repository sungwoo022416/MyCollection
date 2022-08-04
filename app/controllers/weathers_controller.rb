class WeathersController < ApplicationController
    def index
        weathers = Weather.all
        render json: weathers, except: [:created_at, :updated_at];
    end
end
