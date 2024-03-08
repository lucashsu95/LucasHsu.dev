n = int(input())


for _ in range(n):
    k = int(input())
    graphs = []
    
    for _ in range(k):
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

    if any([graph['graph'] is None for graph in graphs]):
        print('F')
        input()
        continue

    middle_nodes = []
    duplicated_edges = []
    for i in range(len(graphs)):
        nodes = set(graphs[i]['graph'].keys())
        leaves = set([node for node in nodes if len(graphs[i]['graph'][node]) == 1])
        middle_nodes.extend(nodes - leaves)

        origin_edges = graphs[i]['edges']
        reversed_edges = ['-'.join(edge.split('-')[::-1]) for edge in origin_edges]
        duplicated_edges.extend(origin_edges + reversed_edges)

    if len(set(middle_nodes)) != len(middle_nodes) or len(set(duplicated_edges)) != len(duplicated_edges):
        print('F')
    else:
        print('T')

    input()
