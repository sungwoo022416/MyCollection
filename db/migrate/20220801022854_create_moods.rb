class CreateMoods < ActiveRecord::Migration[7.0]
  def change
    create_table :moods do |t|
      t.string :feeling
      t.string :one_liner
      t.references :story, null: false, foreign_key: true

      t.timestamps
    end
  end
end
