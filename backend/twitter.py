import re
import tweepy
from conf import *

auth = tweepy.OAuthHandler(API_KEY, API_SECRET_KEY)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)

client = tweepy.Client(bearer_token=BEARER_TOKEN)

def get_trends():
    return api.get_place_trends(id = WEOID, exclude = "hashtags")

def get_followers():
    # print(client.get_users_followers(E_ID, max_results=100))
    return client.get_users_following(E_ID, max_results=20)

def get_liked_tweets(id):
    return client.get_liked_tweets(id=id, tweet_fields=['context_annotations','created_at','geo'], max_results=20)

def get_followers_liked_tweets():
    followers_liked_tweets= {}
    
    for follower in get_followers().data:
        hashtags = list()
        for tweet in get_liked_tweets(follower.id).data:
            for hashtag in re.findall(r"#(\w+)", tweet.text):
                hashtags.append(hashtag)
                
        if len(hashtags) > 0: followers_liked_tweets[follower.id] = hashtags 
    return followers_liked_tweets

def get_top_tweets(id):
    query_str = f"from:{id}"
    return client.search_recent_tweets(
        query=query_str,
        max_results=10,
        sort_order="relevancy",
        tweet_fields=['context_annotations','created_at', 'public_metrics','author_id', 'lang', 'geo', 'entities'])


# get_top_tweets("elonmusk")