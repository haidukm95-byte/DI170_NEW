import math

class Pagination:
    def __init__(self, items=None, page_size=10):
        self.items = items if items is not None else []
        self.page_size = page_size
        self.current_idx = 0
        self.total_pages = math.ceil(len(self.items) / page_size) if len(self.items) > 0 else 0

    def get_visible_items(self):
        start_index = self.current_idx * self.page_size
        end_index = start_index + self.page_size
        return self.items[start_index:end_index]

    def go_to_page(self, page_num):
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError(f'Page {page_num} is out of range')
        self.current_idx = page_num - 1

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        if self.total_pages > 0:
            self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self
    
# Test the Pagination class
large_list = list(range(1, 101))
my_paginator = Pagination(large_list, 10)

print(f"Total pages: {my_paginator.total_pages}")

# Test first page
my_paginator.first_page()
print(f"Items on Page 1: {my_paginator.get_visible_items()}")

# Test navigation to page 5
my_paginator.go_to_page(5)
print(f"Items on Page 5: {my_paginator.get_visible_items()}")

# Test last page
my_paginator.last_page()
print(f"Items on Last Page: {my_paginator.get_visible_items()}")

# Test method chaining
my_paginator.first_page().next_page().next_page()
print(f"Items on Page 3 (via chaining): {my_paginator.get_visible_items()}")

# Test previous page
my_paginator.previous_page()
print(f"Items after going back one page: {my_paginator.get_visible_items()}")