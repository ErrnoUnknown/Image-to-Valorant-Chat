# Import
import cv2

# Read image
img = cv2.imread('111.png')

# Resize image
h, w = img.shape[:2]

h = int(26 * (h / w))

if h >= 13:
    h = 13

img = cv2.resize(img, (26, h))

# Grayscale image
img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Image to list
img = img.flatten().tolist()

# To emoji
result = ''

"""for pixel in img:
    if pixel <= 64:
        result += '░'
    elif pixel <= 128:
        result += '▒'
    elif pixel <= 192:
        result += '▓'
    else:
        result += '█'"""

for pixel in img:
    if pixel <= 51:
        result += '_'
    elif pixel <= 102:
        result += '░'
    elif pixel <= 153:
        result += '▒'
    elif pixel <= 204:
        result += '▓'
    else:
        result += '█'

# Split image
result = '\n'.join(result[i:i+26] for i in range(0, len(result), 26))

print(result)