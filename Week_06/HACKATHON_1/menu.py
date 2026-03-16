import history
import favorites
import country_converter as cc
import sql_connect as sqlc
from Weather import fetch_weather, Display


class Menu:
    choice_city = None
    choice_country = None
    choice_country_iso2 = None

    @classmethod
    def menu(cls):
        print('Welcome to Weather Monitor v 1.0!')
        m = '''
        N - Choose a new location
        H - History
        F - Favorite locations
        Q - Quit
        '''
        print(m)

    @classmethod
    def choice(cls):
        ch = input('What is your choice? ').strip().upper()

        if ch == 'N':
            cls.choice_city = input('Please enter your city: ')
            cls.choice_country = input('Please enter the country where this city is located: ')
            cls.choice_country_iso2 = cc.convert(names=cls.choice_country, to='ISO2')

            # Fetch and display weather
            weather_data = fetch_weather(cls.choice_city, cls.choice_country_iso2)
            if weather_data:
                display = Display(weather_data)
                print(display.header())
                print(display.coordinates())
                print(display.weather_description())
                # Save to history
                wind_azimuth = weather_data['wind_azimuth']
                wind_dir = 'Northern'
                if 22.5 < wind_azimuth < 67.5:
                    wind_dir = 'Northeastern'
                elif 67.5 < wind_azimuth < 112.5:
                    wind_dir = 'Eastern'
                elif 112.5 < wind_azimuth < 157.5:
                    wind_dir = 'Southeastern'
                elif 157.5 < wind_azimuth < 202.5:
                    wind_dir = 'Southern'
                elif 202.5 < wind_azimuth < 247.5:
                    wind_dir = 'Southwestern'
                elif 247.5 < wind_azimuth < 292.5:
                    wind_dir = 'Western'
                elif 292.5 < wind_azimuth < 337.5:
                    wind_dir = 'Northwestern'
                history.insert_query(weather_data, wind_dir)
                xx=input('Do you wish to add this location to favorites? Y/N ')
                if xx.strip().upper()=='Y':
                    favorites.insert_query(weather_data)
                    print('The location is successfully added to favorites!')


        elif ch == 'H':
            history.select_all()
            x = input('Do you wish to clear the history? Y/N ')
            if x.strip().upper() == 'Y':
                history.delete_all()

        elif ch == 'F':
            fav_list = favorites.select_all()
            if not fav_list:
                print('The list is empty!')
            else:
                print("\nYour favorite locations:")
                for fav in fav_list:
                    print(f"ID: {fav[0]}, City: {fav[1]}, Country: {fav[2]}")

                fav_action = input('\nV - View weather for a location\nD - Delete a location\nC - Clear all favorites\nChoice: ').strip().upper()

                if fav_action == 'V':
                    fav_id = input('Enter the location ID: ')
                    if fav_id:
                        qq = 'SELECT * FROM favorites WHERE location_id=%s'
                        sqlc.cursor.execute(qq, (fav_id,))
                        result = sqlc.cursor.fetchone()
                        if result:
                            city = result[1]
                            country = result[2]
                            country_iso2 = cc.convert(names=country, to='ISO2')
                            weather_data = fetch_weather(city, country_iso2)
                            if weather_data:
                                display = Display(weather_data)
                                print(display.header())
                                print(display.coordinates())
                                print(display.weather_description())
                        else:
                            print('Location not found')
                    else:
                        print('No ID entered')

                elif fav_action == 'D':
                    fav_id = input('Enter the location ID to delete: ')
                    if fav_id:
                        favorites.delete_query({'location_id': fav_id})
                        print(f'Location {fav_id} has been removed from favorites!')
                    else:
                        print('No ID entered')

                elif fav_action == 'C':
                    confirm = input('Are you sure you want to clear all favorites? Y/N ').strip().upper()
                    if confirm == 'Y':
                        favorites.truncate()
                    else:
                        print('Operation cancelled')

        elif ch == 'Q':
            print('Goodbye!')
            return False

        else:
            print('Wrong input. Please type correct one.')

        return True


if __name__ == "__main__":
    Menu.menu()
    while Menu.choice():
        Menu.menu()