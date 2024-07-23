n = int(input())

for _ in range(n):
    inorder = list(map(int, input().split(',')))
    preorder = list(map(int, input().split(',')))

    postorder = []
    def get_post(inorder, preorder):
        if len(inorder) == 0:
            return []
        
        root = preorder[0]
        root_index = inorder.index(root)
        
        left_post = get_post(inorder[:root_index], preorder[1:root_index+1])
        right_post = get_post(inorder[root_index+1:], preorder[root_index+1:])
        return left_post + right_post + [root]

    postorder = get_post(inorder, preorder)
    print(','.join(map(str, postorder)))
