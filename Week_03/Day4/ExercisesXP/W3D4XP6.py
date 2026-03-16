from datetime import datetime, timedelta
birthday=datetime(1995,8,30,8,40,0)
current_date=datetime.now()
period_live=current_date-birthday
minutes_live=period_live.total_seconds()/60
print(f'I live {int(minutes_live)} minutes.')
