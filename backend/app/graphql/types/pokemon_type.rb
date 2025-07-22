# frozen_string_literal: true

module Types
  class PokemonType < Types::BaseObject
    field :id, Integer, null: false
    field :name, String, null: false
    field :image_url, String, null: false
    field :types, [String], null: false
    field :hp, Integer, null: true
    field :attack, Integer, null: true
  end
end
