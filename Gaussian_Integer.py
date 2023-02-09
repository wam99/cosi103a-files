'''Hello!'''

class Gaussian_Integer():
    def __init__(self,a,b):
        self.a=a
        self.b=b

    def add(self, g):
        return Gaussian_Integer((self.a + g.a),(self.b + g.b))

    def multiply(self, g):
        return Gaussian_Integer((self.a*g.a-self.b*g.b), (self.a*g.b+self.b*g.a))

    def __str__(self):
        return str(self.a) + " + " + str(self.b) + "i"

u = Gaussian_Integer(1,1)
v = Gaussian_Integer(1,2)
w = u.multiply(u)
x = u.add(v).add(w)
print('u=',u)
print('v=',v)
print('w=',w)
print('x=',x)