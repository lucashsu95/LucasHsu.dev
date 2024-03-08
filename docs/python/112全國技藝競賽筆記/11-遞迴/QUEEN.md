# QUEEN

```python
def conflict(state,nextX):
    nextY = len(state)
    return any(abs(state[i] - nextX) in (0,nextY - i) for i in range(nextY))


def queen(n,state):
    ans = []
    for pos in range(n):
        if not conflict(state,pos):
            ans += [(pos,)+result for result in queen(n,state+(pos,))]
    return ans
print()
```