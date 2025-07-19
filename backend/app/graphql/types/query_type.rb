# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :pokemons, [ Types::PokemonType ], null: false do
      argument :limit, Integer, required: false, default_value: 10
      argument :offset, Integer, required: false, default_value: 0
    end

    def pokemons(limit:, offset:)
  query = <<~GRAPHQL
    {
      pokemon_v2_pokemon(limit: #{limit}, offset: #{offset}) {
        id
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
      }
    }
  GRAPHQL

  response = HTTParty.post("https://beta.pokeapi.co/graphql/v1beta",
    headers: { "Content-Type" => "application/json" },
    body: { query: query }.to_json
  )

  raw_pokemons = response.dig("data", "pokemon_v2_pokemon")

  raw_pokemons.map do |p|
    stats = p["pokemon_v2_pokemonstats"]
    {
      id: p["id"],
      name: p["name"],
      image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/#{p["id"]}.png",
      types: p["pokemon_v2_pokemontypes"].map { |t| t["pokemon_v2_type"]["name"] },
      hp: stats.find { |s| s["pokemon_v2_stat"]["name"] == "hp" }&.dig("base_stat"),
      attack: stats.find { |s| s["pokemon_v2_stat"]["name"] == "attack" }&.dig("base_stat")
    }
  end
end

  end
end
