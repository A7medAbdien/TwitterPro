import re
import tweepy
from conf import *

auth = tweepy.OAuthHandler(API_KEY, API_SECRET_KEY)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)

client = tweepy.Client(bearer_token=BEARER_TOKEN)

def get_trends():
    return api.get_place_trends(id = WEOID, exclude = "hashtags")

def test_trends():
    trends = get_trends()   
    TRENDS = []
    # regexp = re.compile(r'[ء-ي]+')
    
    for value in trends:
        for trend in value['trends']:
            trend_name = trend['name']
            # TRENDS.append(trend_name[::-1]) if regexp.search(trend_name) else TRENDS.append(trend_name)
            TRENDS.append(trend_name)
    return TRENDS


def get_followers():
    return api.get_followers(user_id = MY_ID)

def get_liked_tweets(id):
    return client.get_liked_tweets(id=id, tweet_fields=['context_annotations','created_at','geo'])

def get_followers_liked_tweets():
    followers_liked_tweets= {}
    for follower in get_followers():
        hashtags = list()
        # print(follower.screen_name)
        for tweet in get_liked_tweets(follower.id).data:
            # print(tweet)
            for hashtag in re.findall(r"#(\w+)", tweet.text):
                # print(hashtag)
                hashtags.append(hashtag)
        followers_liked_tweets[follower.screen_name] = hashtags
    # print(followers_liked_tweets)
    return followers_liked_tweets

get_followers_liked_tweets()