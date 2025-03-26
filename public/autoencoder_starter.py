# Starter code for Participation 10
# CPSC 383 Winter 2025
#
# Contains code that can be used to display results of trained autoencoder on MNIST data points
#

import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np


# TO DO: import MNIST data (feel free to use prior code)

# TO DO: create and train your model for MNIST as an autoencoder
# Output of the model should be a (n,28,28) array, where n is the number of data points fed in
# i.e. the same shape as the model input

# compute outputs for entire testing dataset
decoded_imgs = model(x_test).numpy()  # (result is a (10,000, 28, 28) numpy array)

# code to print results on testing digits and compare with original images
n = 10
plt.figure(figsize=(20, 4))
for i in range(n):
    # display original
    ax = plt.subplot(2, n, i + 1)
    plt.imshow(x_test[i])
    plt.title("original")
    plt.gray()
    ax.get_xaxis().set_visible(False)
    ax.get_yaxis().set_visible(False)

    # display reconstruction
    ax = plt.subplot(2, n, i + 1 + n)
    plt.imshow(decoded_imgs[i])
    plt.title("output")
    plt.gray()
    ax.get_xaxis().set_visible(False)
    ax.get_yaxis().set_visible(False)

plt.show()


# create five random 28 x 28 B/W images and feed them through the autoencoder
plt.figure()
N = 5  # number of random images to test

for i in range(N):
    random_img = np.random.rand(1, 28, 28)
    ax = plt.subplot(2, N, 1 + i)
    ax.get_xaxis().set_visible(False)
    ax.get_yaxis().set_visible(False)
    plt.imshow(random_img[0])
    plt.title("random")
    plt.gray()

    res = model(random_img).numpy()
    ax = plt.subplot(2, N, 1 + i + N)
    ax.get_xaxis().set_visible(False)
    ax.get_yaxis().set_visible(False)
    plt.imshow(res[0])
    plt.title("output")
    plt.gray()

plt.show()

