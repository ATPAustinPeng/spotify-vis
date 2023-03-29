# we should try to work with tar (so we don't actually need to extract 300 GB of data when it comes to the full dataset)
# import tarfile

# with tarfile.open("../data/millionsongsubset.tar.gz", "r:gz") as tar:
    # tar.extractall(path="../data/tmp") # extract tar file

    # top_level_dir = os.path.commonprefix(tar.getnames())

    # files = [os.path.join("../data/tmp/top_level_dir", filename) for filename in tar.getnames() if tar.endswith(".h5")]
    # print(files[:3])

import numpy as np
import h5py
import pandas as pd
import os
import csv
import tqdm

with open("../data/artist_names.csv", "w") as f:
    writer = csv.writer(f) # create the csv writer

    for root, dirnames, filenames in os.walk("../data/MillionSongSubset"): # iterate over all existing h5 files
        for filename in filenames:
            if filename.endswith(".h5"): # keep only h5 files
                hdf = pd.HDFStore(os.path.join(root, filename), mode="r")
                writer.writerow(hdf.get("/metadata/songs/").artist_name) # save the artist name
                hdf.close()