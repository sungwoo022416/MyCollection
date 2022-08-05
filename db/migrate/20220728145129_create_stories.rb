class CreateStories < ActiveRecord::Migration[7.0]
  def change
    create_table :stories do |t|
      t.string :city
      t.string :date
      t.string :year
      t.string :image
      t.string :content

      t.timestamps
    end
  end
end
