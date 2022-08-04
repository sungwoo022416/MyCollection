class MoodsController < ApplicationController
    def index
        @moods = Mood.all
        render json: @moods, except: [:created_at, :updated_at]
    end

    def create
        @mood = Mood.create(mood_params)
        render json: @mood, except: [:created_at, :updated_at]
        end
    
        private
    
        def mood_params
            params.require(:mood).permit(:feeling, :one_liner, :story_id)
        end
end
