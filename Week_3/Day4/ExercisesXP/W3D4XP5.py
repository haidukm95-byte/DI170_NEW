from datetime import datetime, timedelta
selected_date=datetime(2027,1,1,0,0,0)
current_date=datetime.now()
time_left=selected_date-current_date
print(f'Time left to January 1, 2027: {time_left}')
