# Stacks and queues

Stacks
- one pointer (top of the stack)
- last in first out LIFO

Queues
- one head pointer
- one tail pointer
- First in first out FIFO

pseudocode for a queue
```
int arr[10] 
int bottom = -1
int top = 0 

func pop(){ 
    if (bottom >= top) {
        throw err
    }
    arr[bottom] = null
    bottom++
}

func push(item) {
    if (top <= bottom) {
        throw err
    }
    arr[top] = item
    top++

}

func main() {
    push(11)
    push(1097)
    pop()
}
```