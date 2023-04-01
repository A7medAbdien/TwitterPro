import re
from conf import *

def get_user_info(user_id=None,username=None):
    return client.get_user(
        id = user_id,
        username = username,
        user_fields = ['profile_image_url', 'created_at', 'public_metrics'])

def get_trends():
    return api.get_place_trends(id = WOEID, exclude = "hashtags")

def get_followers():
    return client.get_users_followers(ELUN_ID, max_results=FOLLOW_NUM)

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
                followers_liked_tweets[user.id] = user, tweets    
        except:
            print(f"This ID {user.id} {user.name} has no liked tweets")
            continue
    return followers_liked_tweets

def get_recent_tweets(id=ELUN_ID,max=TWEETS_NUM):
    query_str = f"from:{id} -is:reply -is:retweet"
    return client.search_recent_tweets(
        query=query_str,
        max_results = max,
        tweet_fields= ['context_annotations','created_at','geo','public_metrics'])

def get_recent_replies(id=ELUN_ID,max=TWEETS_NUM):
    query_str = f"from:{id} is:reply -is:retweet"
    return client.search_recent_tweets(
        query=query_str,
        max_results = max,
        tweet_fields=['context_annotations','created_at','geo','public_metrics','in_reply_to_user_id'])
    
def get_top_tweets(id=ELUN_ID,max=TWEETS_NUM):
  query_str = f"from:{id} -is:reply -is:retweet"
  return client.search_recent_tweets(
      query=query_str,
      max_results = max,
      sort_order="relevancy",
      tweet_fields=['context_annotations','created_at','geo','public_metrics'])

def extract_hashtags(followers_liked_tweets):
    tweets = {}
    for user, tweet in followers_liked_tweets.items()[-1]:
        hashtags = list()
        for hashtag in re.findall(r"#(\w+)", tweet.text):
            hashtags.append(hashtag)
        if len(hashtags) > 0: tweets[user]= hashtags 
    return tweets