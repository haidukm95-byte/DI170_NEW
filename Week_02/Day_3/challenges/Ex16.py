#Exercise 16
#Instructions

#Write a function that test if a number is prime:

nmb = int(input('Pick a number: '))

def isprime(n):
    if n < 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False

    # Check odd divisors from 3 up to sqrt(n)
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

if isprime(nmb):
    print(f'The number {nmb} is prime')
else:
    print(f'The number {nmb} is not prime')
