import pandas as pd
import json

class RecommendationGraph:
    
    # Initialize Graph with an empty list of nodes and edges
    
    def __init__(self):
        self.nodes = {}
        self.edges = []
        
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
        
    # Each Node is created with a song name and song id    
        
class Node:
    
    def __init__(self, song_name, song_id):
        self.name = song_name
        self.song_id = song_id

recommendation_graph = RecommendationGraph()
song_info = pd.read_csv("song_info_by_tid.csv")

for index, row in song_info.iterrows():
    source_song_id = row['track_id']
    #print(source_song_id)
    source_song_name = row['title']
    
    if source_song_id not in recommendation_graph.nodes:
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
        #print(splitted_song)
        target_id = splitted_song[0]
        similarity_index = splitted_song[1]
        #print(similarity_index)
        if target_id not in recommendation_graph.nodes:
            target_name = "Null"
            if target_id in song_info['track_id']:
                target_name = song_info[song_info['track_id'] == target_id]['title']
            if target_id not in recommendation_graph.nodes:
                tmp_node = Node(target_id, target_name)
                recommendation_graph.addNode(target_id, tmp_node)
        recommendation_graph.addEdge(source_song_id, target_id, float(similarity_index))