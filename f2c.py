def main():
    print("F:", "  ", "C:")
    for i in range(0,101,10):
        print(i, "  ", f_to_c(i))

def f_to_c(deg_f):
    deg_c = (deg_f-32)*5/9
    return deg_c

main()