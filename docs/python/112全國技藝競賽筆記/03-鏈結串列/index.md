# 02-鏈結串列 Linked List


```python
class Node:
    def __init__(self, x):
        self.data = x
        self.next = None
class LinkedList:
    def __init__(self):
        self.head = None
    def insertHead(self, x):
        self.head = Node(x)
    def insert(self, y, x): # 在y後面插入x
        tmp = self.head
        nodex = Node(x)
        while tmp != None:
            if tmp.data == y:
                break
            tmp = tmp.next
        nodex.next = tmp.next
        tmp.next = nodex
    def remove(self, x):
        tmp =self.head
        while tmp != None:
            if tmp.data == x:
                break
            before = tmp
            tmp = tmp.next
        if tmp == self.head:  #刪除第一個元素
            self.head = self.head.next
        else:
            before.next = tmp.next
    def printLinkedList(self):
        tmp = self.head
        while tmp != None:
            print(tmp.data, " ", end = "")
            tmp = tmp.next
        print()
li = LinkedList()
li.insertHead(5)
li.insert(5,3)
li.printLinkedList()
li.insert(3,6)
li.printLinkedList()
li.insert(3,2)
li.printLinkedList()
li.remove(3)
li.printLinkedList()
li.remove(5)
li.printLinkedList()
li.remove(2)
li.printLinkedList()
li.remove(6)
li.printLinkedList()
```