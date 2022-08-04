class ToDoListsController < ApplicationController
    def index
        @to_do_lists = ToDoList.all
        render json: @to_do_lists, except: [:created_at, :updated_at]
    end

    def create
        @to_do_list = ToDoList.create(to_do_params)
        render json: @to_do_list, except: [:created_at, :updated_at]
    end

    def destroy
        @to_do_list = ToDoList.find(params[:id])
        @to_do_list.destroy
        render json: @to_do_list, except: [:created_at, :updated_at]
    end

    private

    def to_do_params
        params.require(:to_do_list).permit(:task, :story_id)
    end
end
