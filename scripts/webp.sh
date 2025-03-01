#!/bin/bash

for img in *.jpg; do magick "$img" -resize 2880x -gravity East -crop 1440x1440+0+0 +repage "optimized_${img%.*}.webp"; done
for img in *.jpg; do magick "$img" -resize 2880x -gravity West -crop 1440x1440+0+0 +repage "optimized_${img%.*}.webp"; done
for img in *.jpg; do magick "$img" -gravity West -crop 1440x1440+0+0 +repage "optimized_${img%.*}.webp"; done
for img in *.jpg; do magick "$img" -gravity West -crop 1440x1440+0+0 +repage -quality 75 "optimized_${img%.*}.webp"; done
for img in *.jpg; do magick "$img" -gravity West -crop 1440x1440+0+0 +repage -quality 85 "${img%.*}.webp"; done
for img in *.jpg; do magick "$img" -gravity West -crop 1440x1440+0+0 +repage -quality 100 "${img%.*}.webp"; done
for img in *.jpg; do magick "$img" -gravity West -crop 1440x1440+0+0 +repage -quality 75 "${img%.*}.webp"; done
