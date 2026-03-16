import requests
from datetime import datetime, timezone, timedelta
import country_converter as cc


def fetch_weather(city, country_iso2):
    """Fetch weather data for a given city and country."""
    api_url = f'https://api.openweathermap.org/data/2.5/weather?q={city},{country_iso2.strip().lower()}&units=metric&appid=9309ed0533ec12b74a863321350a0567'
    response = requests.get(api_url)

    if response.status_code == 200:
        weather = response.json()
        print('API request successful')

        data = {
            # City and country name variables
            'city_name': weather['name'],
            'country_name_alpha': weather['sys']['country'],
            'country_name_full': cc.convert(names=weather['sys']['country'], to='name_short'),
            # Geographical coordinates
            'longitude': weather['coord']['lon'],
            'latitude': weather['coord']['lat'],
            # Temperature data
            'temp': weather['main']['temp'],
            'temp_feels_like': weather['main']['feels_like'],
            'temp_min': weather['main']['temp_min'],
            'temp_max': weather['main']['temp_max'],
            # Weather condition
            'weather_main': weather['weather'][0]['main'],
            'weather_desc': weather['weather'][0]['description'],
            # Other metrics
            'humidity': weather['main']['humidity'],
            'atm_pres': weather['main'].get('grnd_level', weather['main'].get('pressure', 0)),
            'visibility': weather.get('visibility', 0),
            # Wind metrics
            'wind_speed': weather['wind']['speed'],
            'wind_azimuth': weather['wind'].get('deg', 0),
            # Cloudiness rate
            'clouds': weather['clouds']['all'],
            # Sunrise and sunset
            'sunrise': weather['sys']['sunrise'],
            'sunset': weather['sys']['sunset'],
            # Current date
            'date': weather['dt'],
            'time_zone': weather['timezone'],
            'location_id': weather['id']
        }
        return data
    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
        return None

class Display:
    def __init__(self, data):
        self.data = data

    def header(self):
        local_tz = timezone(timedelta(seconds=self.data['time_zone']))
        return f'''
        Weather in {self.data['city_name']}, {self.data['country_name_full']}:
        Current date: {datetime.fromtimestamp(self.data['date'], tz=local_tz).strftime('%Y-%m-%d %H:%M:%S')}
        Sunrise: {datetime.fromtimestamp(self.data['sunrise'], tz=local_tz).strftime('%H:%M')}
        Sunset: {datetime.fromtimestamp(self.data['sunset'], tz=local_tz).strftime('%H:%M')}
        '''

    def coordinates(self):
        latitude = self.data['latitude']
        longitude = self.data['longitude']
        direction_NS = 'North'
        direction_WE = 'East'
        if latitude < 0:
            direction_NS = 'South'
        if longitude < 0:
            direction_WE = 'West'

        return f'''
        Coordinates:
        {abs(latitude)} degrees {direction_NS}, {abs(longitude)} degrees {direction_WE}
        '''

    def weather_description(self):
        wind_azimuth = self.data['wind_azimuth']
        #45 NE, 90 E, 135 SE, 180 S, 225 SW, 270 W, 315 NW, 360/0 N
        wind_dir = 'Northern'
        if 22.5 <= wind_azimuth < 67.5:
            wind_dir = 'Northeastern'
        elif 67.5 <= wind_azimuth < 112.5:
            wind_dir = 'Eastern'
        elif 112.5 <= wind_azimuth < 157.5:
            wind_dir = 'Southeastern'
        elif 157.5 <= wind_azimuth < 202.5:
            wind_dir = 'Southern'
        elif 202.5 <= wind_azimuth < 247.5:
            wind_dir = 'Southwestern'
        elif 247.5 <= wind_azimuth < 292.5:
            wind_dir = 'Western'
        elif 292.5 <= wind_azimuth < 337.5:
            wind_dir = 'Northwestern'

        atm_pres = self.data['atm_pres']
        return f'''
        Weather description:
        {self.data['temp']} C
        {self.data['weather_main']} ({self.data['weather_desc']})
        Feels like {self.data['temp_feels_like']} C
        Minimal today\'s temperature: {self.data['temp_min']} C
        Maximal today\'s temperature: {self.data['temp_max']} C
        Humidity: {self.data['humidity']}%
        Atmospheric pressure: {atm_pres} mbar / {atm_pres*0.750062:.0f} mmHg
        Wind: {wind_azimuth}° {wind_dir}
        Wind speed: {self.data['wind_speed']} m/s
        Cloudiness rate: {self.data['clouds']}%
        Visibility: {self.data['visibility']} m
        '''


if __name__ == "__main__":
    # Example usage - replace with actual city and country
    city = input("Enter city: ")
    country = input("Enter country: ")
    country_iso2 = cc.convert(names=country, to='ISO2')

    if country_iso2 == 'not found':
        print(f"Error: Could not find country '{country}'")
        exit(1)

    weather_data = fetch_weather(city, country_iso2)
    if weather_data:
        display = Display(weather_data)
        print(display.header())
        print(display.coordinates())
        print(display.weather_description())

