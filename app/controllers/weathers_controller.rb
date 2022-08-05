class WeathersController < ApplicationController
    def index
        @weathers = Weather.all
        render json: @weathers, except: [:created_at, :updated_at];
    end

    def create
        @weather = Weather.create(weather_params)
        render json: @weather, except: [:created_at, :updated_at]
    end

    private

    def weather_params
        params.require(:weather).permit(:min, :max, :icon_day, :icon_night, :story_id)
    end
    
end
