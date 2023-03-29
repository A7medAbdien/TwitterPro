import re
import tweepy
from conf import *

auth = tweepy.OAuthHandler(API_KEY, API_SECRET_KEY)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)

client = tweepy.Client(bearer_token=BEARER_TOKEN)

MAX_RESULT = 20

def get_trends():
    return api.get_place_trends(id = WOEID, exclude = "hashtags")

def get_followers():
    print(client.get_users_followers(E_ID, max_results=MAX_RESULT))

def get_following():
    return client.get_users_following(E_ID, max_results=MAX_RESULT)

def get_user_liked_tweets(id):
    return client.get_liked_tweets(id=id, tweet_fields=['context_annotations','created_at','geo'], max_results=MAX_RESULT)

def get_liked_tweets(whom):
    followers_liked_tweets= {}
    
    for user in whom().data:
        tweets = list()
        try:
            tweets = get_user_liked_tweets(user.id).data
            if len(tweets) > 0:
                for tweet in tweets:
                    followers_liked_tweets[user.id] = tweet        
        except:
            print(f"This ID {user.id} {user.name} has no liked tweets")
            continue
            
    return followers_liked_tweets


def extract_hashtags(followers_liked_tweets):
    tweets = {}
    for user, tweet in followers_liked_tweets.items():
        hashtags = list()
        for hashtag in re.findall(r"#(\w+)", tweet.text):
            hashtags.append(hashtag)
        if len(hashtags) > 0: tweets[user]= hashtags 
    return tweets


def get_top_tweets(id,max):
    query_str = f"from:{id}"
    return client.search_recent_tweets(
        query=query_str,
        max_results = max,
        sort_order="relevancy",
        tweet_fields=['context_annotations','created_at', 'public_metrics','author_id', 'lang', 'geo', 'entities'])
