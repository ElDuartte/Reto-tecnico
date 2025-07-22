class Pokemon < ApplicationRecord
  validates :name, presence: true
  validates :hp, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, presence: true
  validates :attack, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, presence: true
end
