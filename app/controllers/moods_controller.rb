class MoodsController < ApplicationController
    def index
        moods = Mood.all
        render json: moods, except: [:created_at, :updated_at]
    end
end
