# Atomic Weekly — Hero Refresh Artwork

This folder contains the image files used by the homepage hero artwork rotation.

On each page refresh, `index.html` chooses one image from this folder and remembers the previously used filename so it can avoid selecting the same image twice in a row.

The original images remain in `assets/` for article covers and existing references. These paths are dedicated copies in the Git tree so homepage rotation is kept separate from the general media library.

Managed by the `atomic-weekly-2.0` branch.
