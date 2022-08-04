class User < ApplicationRecord
    has_many :stories;
    has_many :to_do_lists, through: :stories;
    has_many :passwords, through: :stories;

end
