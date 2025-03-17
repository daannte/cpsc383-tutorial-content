"""
Demo code for CPSC 383
Works with bakechefData.csv dataset

Author: Janet Leahy
Oct. 19, 2024
"""

import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "1"

import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
import csv

print("TensorFlow version:", tf.__version__)
print("\n\n Messages complete! Let's start... \n\n")


##############################################


# given a list with the features and label for a sample (row of the csv),
# converts it to a numeric feature vector (row vector) and an integer label
# returns the tuple (feature, label)
def getDataFromSample(sample):
    # TODO: Meat (beef/chicken/other)
    if sample[0] == "beef":
        meat = [1, 0, 0]

    # TODO: Satay (Y/N)

    # TODO: Bread (white/brown)

    veggie_list = ["cucumber", "carrots", "cilantro", "onions", "lettuce", "jalapeno"]
    veggies = sample[3].replace("'", "")
    veggies = veggies[1:-1]  # remove "list" brackets
    veggies = veggies.split(",")  # convert to an array that we can check for veggies

    # TODO: Veggies (cucumber/carrots/cilantro/onions/lettuce/jalapeno)
    veggies_vec = [0, 0, 0, 0, 0, 0]
    for i in range(6):
        pass

    # TODO: concatenate results to get feature vector

    # TODO: convert into a 2D numpy row vector

    # TODO: get the label for this sample

    # TODO: return as a tuple of (features, label)


##############################################


# reads number of samples, feature vectors and their labels from the given file
# and converts features to feature vectors
# returns (features_array, labels_array) as a tuple
# where features_array is a (n, 12) numpy array and labels_array is a (n, ) numpy array
def readData(filename):
    with open(filename, newline="") as datafile:
        reader = csv.reader(datafile)
        next(reader, None)  # skip the header row

        n = 0
        features = []
        labels = []

        for row in reader:
            featureVec, label = getDataFromSample(row)
            features.append(featureVec)
            labels.append(label)
            n = n + 1

    print(f"Number of data points read: {n}")

    features_array = np.concatenate(features, axis=0)
    labels_array = np.array(labels)

    return (n, features_array, labels_array)


################################################


# reads the data from the bakechefData.csv file,
# passes the rows to be encoded into feature vectors,
# and divides the data into training and testing sets
def prepData():
    n, features, labels = readData("bakechefData.csv")

    ntrain: int
    ntest: int
    # TODO: split into training and testing data
    # keep 5/6 for training data and the rest for testing

    trainingFeatures = features[:ntrain]
    trainingLabels = labels[:ntrain]  # keep these as numeric values (like in mnist)
    print(f"Number of training samples: {ntrain}")

    testingFeatures = features[ntrain:]
    testingLabels = labels[ntrain:]  # keep these as numeric values (like in mnist)
    print(f"Number of testing samples: {ntest}")

    trainingData = (trainingFeatures, trainingLabels)
    testingData = (testingFeatures, testingLabels)
    return (trainingData, testingData)


###################################################

(x_train, y_train), (x_test, y_test) = prepData()


print(x_train.shape)
print(y_train.shape)
print(x_test.shape)
print(y_test.shape)


# TODO: define num of features
num_of_features: int

model = tf.keras.models.Sequential(
    [
        tf.keras.Input(shape=(num_of_features,)),
        tf.keras.layers.Dense(20, activation="relu"),
        # TODO: add a second hidden layer, with 10 neurons and relu activation
        tf.keras.layers.Dense(2),
    ]
)
# print(model.summary())

loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
# using sparse loss because y-values are encoded as integers, not one-hot

model.compile(optimizer=tf.keras.optimizers.Adam(), loss=loss_fn, metrics=["accuracy"])

# TODO: set up the model to be viewed in tensorboard afterwards (2 lines)


# train and then test the model
# TODO: train the model using the training data with 10 epochs (dont forget tensorboard callback method!!)

model.evaluate(x_test, y_test, verbose=2)


########################################################################


# TODO: show predictions on input of our choice after training
vector, label = getDataFromSample(["", "", "", "[...]", ""])
print(vector)

predictions = model(vector).numpy()
# print(predictions)
# TODO: get the probabilities of each class from the model's output
probs: np.ndarray

# print(probs)

print(f"Model's guess: {np.argmax(probs)} Label: {label}")
