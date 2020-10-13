If you know the rule to get from one term to the next in a sequence you can write a recurrence relation

A **recurrence relation** of the form <font size=4>$U_{n+1} = f(U_n)$</font> defines each term of a sequence as a function of the previous term

For example, the recurrence relation <font size=4>$U_{n+1} = 2U_n + 3, \space u_1 = 6$</font> produces the following sequence:

6, 15, 33, 39, ... 

---

Example 19)

Find the first four terms of the following sequences.

<font size=4>

a) $u_{n+1} = u_n + 4, u_1 = 7$

b) $u_{n+1} = u_n + 4, u_1 = 5$

a) 7, 11, 15, 19

b) 5, 9, 13, 17

---

Example 20)

A sequence $a_1, a_2, a_3, ....$ is defined by 

$a_1 = p$

$a_{n+1} = (a_n)^2 - 1, n \geq 1$

Where p < 0

a) Show that $a_3 = p^4 -2p^2$

b) Given that $a_2 = 0$, find the value of p

c) Find $\sum_{r=1}^{200}a_r$

d) Write down the value of $a_199$

A)

$a_1 = p$

$a_{n+1} = (a_n)^2 - 1, m \geq 1$

$a_{2} = (a_1)^2 - 1 = p^2 -1$

$a_{3} = (a_2)^2 -1$

$= (p^2-1)^2 -1$

$=p^4 -2p^2 + 1 - 1$

$= p^4 -2p^2$

B) 

$p^2 - 1 = 0$

$p^2 = 1$

$p = +/- 1$ but since p < 0 is given, p = -1

C)

$a_1 = -1, a_2 = 0, a_3 = -1$ series alternates between -1 and 0


In 200 terms, there will be one hundred -1s and one hundred 0s

$\sum_{r=1}^{200}a_r = -100$

D)

$a_{199} = -1$ as 199 is odd