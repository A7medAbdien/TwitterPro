import re
from conf import *

def get_trends():
    return api.get_place_trends(id = WOEID, exclude = "hashtags")

def get_followers():
    print(client.get_users_followers(ELUN_ID, max_results=FOLLOW_NUM))

def get_following():
    return client.get_users_following(ELUN_ID, max_results=FOLLOW_NUM)

def get_user_liked_tweets(user_id):
    return client.get_liked_tweets(
        id=user_id,
        tweet_fields=['context_annotations','created_at','geo','public_metrics'],
        max_results=TWEETS_NUM)

def get_liked_tweets(whom):
    followers_liked_tweets= {}
    
    for user in whom().data:
        tweets = list()
        try:
            tweets = get_user_liked_tweets(user.id).data
            if len(tweets) > 0:
                for tweet in tweets:
                    followers_liked_tweets[user.id] = {
                        "id":tweet.id,
                        "text":tweet.text,
                        "created_at":tweet.created_at,
                        "geo":tweet.geo,
                        "public_metrics":tweet.public_metrics,
                        "context_annotations":tweet.context_annotations
                        }        
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

def get_top_tweets(id , max = TWEETS_NUM):
    query_str = f"from:{id} is:reply"
    return client.search_recent_tweets(
        query=query_str,
        max_results = max,
        sort_order="relevancy",
        tweet_fields=['context_annotations','created_at', 'public_metrics','author_id', 'lang', 'geo', 'entities'])
