class Weather < ApplicationRecord
  belongs_to :location;
  belongs_to :story;
end
