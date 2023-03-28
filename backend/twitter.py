import tweepy
from conf import *

client = tweepy.Client(bearer_token=BEARER_TOKEN)

query = 'covid'

res = client.search_recent_tweets(query=query)

# print(res)

# authorization of consumer key and consumer secret
auth = tweepy.OAuthHandler(API_KEY, API_SECRET_KEY)
 
# set access to user's access key and access secret
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
 
# calling the api
api = tweepy.API(auth)
 
# WOEID of London
woeid = 44418
 
# fetching the trends
trends = api.get_place_trends(id = woeid)
 
# printing the information
print("The top trends for the location are :")
 
for value in trends:
    for trend in value['trends']:
        print(trend['name'])