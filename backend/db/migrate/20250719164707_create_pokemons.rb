class CreatePokemons < ActiveRecord::Migration[8.0]
  def change
    create_table :pokemons do |t|
      t.string :name
      t.string :image_url
      t.string :types
      t.integer :hp
      t.integer :attack

      t.timestamps
    end
  end
end
