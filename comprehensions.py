def divisors(n):
    divisors = [d for d in range (2,n) if n%d==0]
    return(divisors)

def letter_count(s):
    mylist = list(s)
    myset = set(mylist)
    dict = {w:mylist.count(w) for w in myset}
    return dict

print(divisors(120))
print(letter_count("hello"))
