#What is the difference between these 2 pieces of code ?

class A(B):
    def __init__(self, *args, **kwargs)
        B.__init__(self, *args, **kwargs)
        pass


class A(B):
    def __init__(self, *args, **kwargs)
        super().__init__(*args, **kwargs)
        pass

