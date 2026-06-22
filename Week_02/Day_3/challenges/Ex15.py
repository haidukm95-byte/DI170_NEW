def get_common_divisors(n1, n2):
    common_divisors = []
    smaller=min(n1, n2)
    for i in range(1, smaller + 1):
        if n1 % i == 0 and n2 % i== 0:
            common_divisors.append(i)
    return common_divisors
n1=int(input('Pick a number: '))
n2=int(input('Now pick one more: '))
common_divs=get_common_divisors(n1,n2)
print(f'The common divisors of {n1} and {n2} are: {common_divs}')

