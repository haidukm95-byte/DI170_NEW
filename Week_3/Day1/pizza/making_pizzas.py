# To import an entire module, we input:
import pizza

pizza.make_pizza('L', 'mushroom', 'onion', 'anchovies')

# Importing specific functions

# You can also import a specific function from a module. Here’s the general syntax for this approach:

from pizza import make_pizza

make_pizza('20', 'cheese', 'tomatoes', 'mushrooms')

#Using alias
#You can give a nickname to each module/function you import. This nickname, a short, unique alias (an alternate name similar to a nickname for the function), is defined as` keyword.

from pizza import make_pizza as mp

mp('15', 'olives', 'mushrooms', 'bulgarian cheese')


