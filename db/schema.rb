# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_01_022854) do
  create_table "moods", force: :cascade do |t|
    t.string "feeling"
    t.string "one_liner"
    t.integer "story_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["story_id"], name: "index_moods_on_story_id"
  end

  create_table "stories", force: :cascade do |t|
    t.string "city"
    t.string "date"
    t.string "year"
    t.string "image"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "to_do_lists", force: :cascade do |t|
    t.string "task"
    t.integer "story_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["story_id"], name: "index_to_do_lists_on_story_id"
  end

  create_table "weathers", force: :cascade do |t|
    t.integer "min"
    t.integer "max"
    t.string "icon_day"
    t.string "icon_night"
    t.integer "story_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["story_id"], name: "index_weathers_on_story_id"
  end

  add_foreign_key "moods", "stories"
  add_foreign_key "to_do_lists", "stories"
  add_foreign_key "weathers", "stories"
end
