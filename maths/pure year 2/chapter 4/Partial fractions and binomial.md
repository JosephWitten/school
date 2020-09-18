# Partial fractions + the binomail expansion

Expand $\frac{3}{8x^2+6x+1}$ up to and including the term x^3

1) Partial fractions

<font size=5>

$\frac{3}{(4x+1)(2x+1)} = \frac{A}{4x+1} + \frac{b}{2x+1}$

*partial fractions working*

$\frac{3}{(4x+1)(2x+1)} \equiv \frac{6}{4x+1} - \frac{3}{2x+1}$

$= 6(1+4x)^{-1} - 3(1+2x)^{-1}$

Then individually expand each bracket

$1 + nx + \frac{n(n-1)x}{2!} + \frac{n(n-1)(n-2)x^3}{3!}$

$6(1+4x)^{-1} = 6(1-4x + 16x^2 -64x^3)$

$\left | x \right | < \frac{1}{4}$

$- 3(1+2x)^{-1} = 3(1-2x+4x^2 -8x^3)$

$\left | x \right | < \frac{1}{2}$

so $\frac{3}{(4x+1)(2x+1)} = 6(1-4x + 16x^2 - 64x^3) -3(1-2x +4x^2-8x^3)$

$\frac{3}{(4x+1)(2x+1)} = 3 - 18x + 84x^3 -360x^3$

</font>

An **Improper algrebraic fraction** is when the degree on the numerator is the same or bigger than the denominator.

To solve these type of questions:
- do polynomial long division to get A, then do partial fractions on the remaining

## hw q5,q6,q7 ex 4c