class Story < ApplicationRecord
    has_many :to_do_lists, dependent: :destroy;
    has_one :weather, dependent: :destroy;
    has_one :password, dependent: :destroy;
    has_one :mood, dependent: :destroy;
    belongs_to :user;

end
