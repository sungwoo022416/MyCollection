class CreateStories < ActiveRecord::Migration[7.0]
  def change
    create_table :stories do |t|
      t.string :city
      t.string :month
      t.string :day
      t.string :year
      t.string :image
      t.string :content
      t.references :user

      t.timestamps
    end
  end
end
