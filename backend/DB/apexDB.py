import pandas as pd
import requests

import requests
api_url = "https://jsonplaceholder.typicode.com/todos/1"
response = requests.get(api_url)
print(response.json())

url = "https://apex.oracle.com/pls/apex/twitter_app/emp/?limit=10"
r = requests.get("https://apex.oracle.com/pls/apex/twitter_app/emp/?limit=10")
json = r.json()
df = pd.DataFrame(json['items'])

print(df.info())