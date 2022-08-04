class LocationsController < ApplicationController
    def index
        locations = Location.all
        render json: locations, except: [:created_at, :updated_at];
    end
end
