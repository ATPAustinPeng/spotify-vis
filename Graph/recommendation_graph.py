import pandas as pd
import json

class RecommendationGraph:
    
    # Initialize Graph with an empty list of nodes and edges
    
    def __init__(self):
        self.nodes = {}
        self.edges = []
        self.num_in_edges = {}
        self.num_out_edges = {}
        
    # Add Node: The node will be comprised of just the song name and song id
    
    def addNode(self, tid, node):
        self.nodes[tid] = node
    
    # Each Edge will be drawn from source to target based on the similarity
    # index of the two songs to each other. I'm not sure if the similarity
    # index is bidirectionally equivalent, but if it is that would reduce
    # the need for a DAG and we could just connect two nodes together instead
    # of worrying about distinguishing between source and target.
    
    #UPDATE: EDGES ARE NOT BIDIRECTIONALLY EQUIVALENT, SO WE ARE DEALING WITH A DAG
    
    # Additionally, within the visualization, should we scale the edges
    # based on the value of the similarity index? It is between 0 and 1 
    # after all so I think it makes sense.
    
    def addEdge(self, source, target, similarity):
        edge = []
        edge.append(source)
        edge.append(target)
        edge.append(similarity)
        self.edges.append(edge)
        if source not in self.num_out_edges:
            self.num_out_edges[source] = 1
        else:
            self.num_out_edges[source] += 1
        if target not in self.num_in_edges:
            self.num_in_edges[target] = 1
        else:
            self.num_in_edges[target] += 1
        
    # Each Node is created with a song name and song id    
        
class Node:
    
    def __init__(self, song_name, song_id):
        self.name = song_name
        self.song_id = song_id

recommendation_graph = RecommendationGraph()
song_info = pd.read_csv("lastfm_train_test_comb.csv")

numNodes = 10000

for index, row in song_info.iterrows():
    print(index)
    source_song_id = str(row['track_id'].strip())
    source_song_name = str(row['title'])
    
    if source_song_id not in recommendation_graph.nodes and len(row['similars']) > 0:
        tmp_node = Node(source_song_id, source_song_name)
        recommendation_graph.addNode(source_song_id, tmp_node)
    
    similar_songs = row['similars']
    similar_songs = similar_songs.replace('[','')
    similar_songs = similar_songs.replace("'", '')
    similar_songs = similar_songs.replace(" ", '').split('],')
    
    for song in similar_songs:
        song = song.replace(']', '')
        splitted_song = song.split(',')
        if len(splitted_song) != 2:
            continue
        target_id = str(splitted_song[0].strip())
        similarity_index = splitted_song[1]
        if target_id not in recommendation_graph.nodes:
            target_name = "Null"
            if target_id in song_info['track_id'].values:
                target_name = str(song_info[song_info['track_id'] == target_id]['title'])
            else:
                continue
            tmp_node = Node(target_id, target_name)
            recommendation_graph.addNode(target_id, tmp_node)
        recommendation_graph.addEdge(source_song_id, target_id, float(similarity_index))
    
    if len(recommendation_graph.nodes) >= numNodes:
        break
            
print(len(recommendation_graph.nodes))
print(len(recommendation_graph.edges))

for tid in recommendation_graph.nodes:
    if tid in recommendation_graph.num_in_edges:
        print(recommendation_graph.num_in_edges[tid])
    else:
        print(str(0))
    if tid in recommendation_graph.num_out_edges:
        print(recommendation_graph.num_out_edges[tid])
    else:
        print(str(0))
    print("-----------------------------------------")