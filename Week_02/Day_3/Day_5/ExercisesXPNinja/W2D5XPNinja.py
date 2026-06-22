class Phone:
    def __init__(self, phone_number):
        self.phone_number=phone_number
        self.call_history=[]
    def call(self, other_phone):
        self.call_history.append(other_phone)

    def show_call_history(self):
        print(self.call_history)

phone1=Phone('0534308194')
phone2=Phone('0525851295')

phone1.show_call_history()