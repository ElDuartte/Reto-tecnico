require "test_helper"

class PokemonTest < ActiveSupport::TestCase
  test "nombre obligatorio" do
    pokemon = Pokemon.new(name: nil, hp: 50, attack: 60)
    assert_not pokemon.valid?
    assert_includes pokemon.errors[:name], "can't be blank"
  end

  test "hp obligatorio y debe ser positivo" do
    pokemon = Pokemon.new(name: "Pikachu", hp: -10, attack: 60)
    assert_not pokemon.valid?
    assert_includes pokemon.errors[:hp], "must be greater than or equal to 0"
  end

  test "attack obligatorio y debe ser positivo" do
    pokemon = Pokemon.new(name: "Charmander", hp: 40, attack: nil)
    assert_not pokemon.valid?
    assert_includes pokemon.errors[:attack], "can't be blank"
  end

  test "pokemon válido con todos los datos" do
    pokemon = Pokemon.new(name: "Bulbasaur", hp: 45, attack: 49)
    assert pokemon.valid?
  end
end
