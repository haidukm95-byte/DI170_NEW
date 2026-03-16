class Door:
    def __init__(self, is_opened):
        self.is_opened=is_opened
        
    def open_door(self):
        self.is_opened=True

    def close_door(self):
        self.is_opened=False
        

class BlockedDoor(Door):
    def __init__(self):
        super().__init__(False)

    def open_door(self):
        print('Cannot open the door!')
    
    def close_door(self):
        print("The door is pemanently closed!")
    
aaa=Door()
aaa.close_door()

