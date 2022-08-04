class CreateToDoLists < ActiveRecord::Migration[7.0]
  def change
    create_table :to_do_lists do |t|
      t.string :task
      t.references :story, null: false, foreign_key: true

      t.timestamps
    end
  end
end
