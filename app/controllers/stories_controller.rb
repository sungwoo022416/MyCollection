class StoriesController < ApplicationController
    def index
        @stories = Story.all
        render json: @stories, except: [:created_at, :updated_at]
    end

    def create
        @story = Story.create(story_params)
        render json: @story, except: [:created_at, :updated_at]
    end

    def update
        @story = Story.find(params[:id])
        @story.update(story_params)
        render json: @story, except: [:created_at, :updated_at]
    end
    

    private

    def story_params
        params.require(:story).permit(:title, :date, :image, :content, :user_id)
    end
end
