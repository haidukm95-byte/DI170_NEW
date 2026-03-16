#    Use the Chuck Norris API https://api.chucknorris.io/ to retrieve some jokes in a specific category
#   Use every notion described in the lesson
import requests

url='https://api.chucknorris.io/jokes/random?category=dev'
# We can manually change the category at the end of the link
response=requests.get(url)
data=response.json()
print(data['value'])

