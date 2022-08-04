class CreateStories < ActiveRecord::Migration[7.0]
  def change
    create_table :stories do |t|
      t.string :title
      t.string :date
      t.string :image
      t.string :content
      t.references :user

      t.timestamps
    end
  end
end
