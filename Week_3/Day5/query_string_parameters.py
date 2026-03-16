import requests
parameters = {"lat": 48.8566, "lon": 2.3522}
response = requests.get("http://api.open-notify.org/iss-now.json", params=parameters)
print(response.text)
#REQUEST FOR PEOPLE WHO ARE CURRENTLY IN THE SPACE
response2 = requests.get("http://api.open-notify.org/astros.json")

# Print the content of the response (the data the server returned)
data = response2.json()

print(data)