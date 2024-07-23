n = int(input())


for _ in range(n):
    graphs = []
    
    for _ in range(2):
        edges = input().split()
        graph = {}

        for edge in edges:
            a, b = edge.split('-')

            if a not in graph:
                graph[a] = []

            if b not in graph:
                graph[b] = []

            graph[a].append(b)
            graph[b].append(a)

        nodes = set(graph.keys())
        if len(nodes) != len(edges) + 1:
            graphs.append({
                'graph': None,
                'edges': edges
            })
            continue

        visited = set()
        stack = [list(graph.keys())[0]]

        while stack:
            node = stack.pop()

            if node in visited:
                continue

            visited.add(node)

            for neighbour in graph[node]:
                if neighbour not in visited:
                    stack.append(neighbour)

        if len(visited) != len(nodes):
            graphs.append({
                'graph': None,
                'edges': edges
            })
            continue
        
        graphs.append({
            'graph': graph,
            'edges': edges
        })


    for i in range(len(graphs)):
        if graphs[i]['graph'] is None:
            print('F')
            continue
        
        nodes = set(graphs[i]['graph'].keys())
        leaves = set([node for node in nodes if len(graphs[i]['graph'][node]) == 1])
        middle_nodes = nodes - leaves

        print(', '.join(sorted(middle_nodes)), end='')

        duplicated_edges = set(graphs[i]['edges'])
        for j in range(len(graphs)):
            if i == j:
                continue

            origin_edges = graphs[j]['edges']
            reversed_edges = ['-'.join(edge.split('-')[::-1]) for edge in origin_edges]
            duplicated_edges &= set(origin_edges + reversed_edges)

        duplicated_edges = sorted(duplicated_edges)
        if len(duplicated_edges) > 0:
            print('; ' + ' '.join(duplicated_edges), end='')

        print()

    print()
    input()
