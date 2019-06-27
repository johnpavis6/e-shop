class Product < ApplicationRecord
    validates :name, presence: true,length: {minimum: 2}
    validates :price, presence: true
end
