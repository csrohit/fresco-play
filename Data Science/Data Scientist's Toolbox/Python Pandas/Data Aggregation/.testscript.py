import hashlib
from hashlib import md5
def get_digest(file_path):
    h = md5()

    with open(file_path, 'rb') as file:
        while True:
            # Reading is buffered, so we can read smaller chunks.
            chunk = file.read(h.block_size)
            if not chunk:
                break
            h.update(chunk)

    return h.hexdigest()
if(get_digest("output.txt")=="13a17d872a24992922d9f4bfb8a11fb6"):
  print("You have passed preliminary validations")
else:
  print("You have not passed preliminary validations")
