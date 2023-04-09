# Commented out IPython magic to ensure Python compatibility.
import tweepy

"""# Configrations"""

API_KEY = 'cT81QCU2NFQs4FPvDloiyOQXT'
API_SECRET_KEY = 'HjdLOmkfcSSpJS1puPIQJvme5gnPnZdajHfeAOU2RNGHJF57D4'
BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAGl7mQEAAAAAXXgvmSqEAd7wwieroXpsl2n0S4g' \
               '%3DV2kgceWFN2q0zJyBIok607epKL5IIP0E7uFduWzhP4Nwy3O59g '
ACCESS_TOKEN = '1227908523062972416-FSEXYlRhw3nJdPZh8gCxhgG3ZnZ5k6'
ACCESS_TOKEN_SECRET = 'HLqzzFW2AeP8rwh0i8YdcJUOejKrr04WqxSHsWNrAB1p3'
CLIENT_ID = 'cUhNN3Z0WUhpTUFBVHBXcE5veGU6MTpjaQ'
CLIENT_SECRET = 'C7NcxpMNc-MHvIxpcc2SWQULkeFWLaJ1qfqxArzpgqwhqOa8Za'

# WOEID = 23424753
WOEID = 23424977  # US
APP_ID = 26835817
MY_ID = 1227908523062972416
# ELUN_ID = 44196397
ID = 44196397
# ID = 83389771
USERNAME = "elonmusk"
# USERNAME = "bruno_simon"

FOLLOW_NUM = 20
TWEETS_NUM = 100

auth = tweepy.OAuthHandler(API_KEY, API_SECRET_KEY)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)

client = tweepy.Client(bearer_token=BEARER_TOKEN)


def get_user_info(user_id=None, username=None):
    return client.get_user(
        id=user_id,
        username=username,
        user_fields=['profile_image_url', 'created_at', 'public_metrics'])


def get_trends():
    return api.get_place_trends(id=WOEID, exclude="hashtags")


def get_followers():
    return client.get_users_followers(
        ID,
        max_results=FOLLOW_NUM,
        user_fields=['profile_image_url', 'created_at', 'public_metrics'])


def get_following():
    return client.get_users_following(
        ID,
        max_results=FOLLOW_NUM,
        user_fields=['profile_image_url', 'created_at', 'public_metrics'])


def get_user_liked_tweets(user_id=ID):
    return client.get_liked_tweets(
        id=user_id,
        tweet_fields=['context_annotations', 'created_at', 'geo', 'public_metrics', 'author_id'],
        max_results=TWEETS_NUM)


def get_liked_tweets(whom):
    followers_liked_tweets = {}
    count = 0
    for user in whom().data:
        # tweets = list()
        try:
            tweets = get_user_liked_tweets(user.id).data
            if len(tweets) > 0:
                followers_liked_tweets[user.id] = user, tweets
        except:
            count += 1
            print(f"This ID {user.id} {user.name} has no liked tweets")
            continue
    return followers_liked_tweets


def get_recent_tweets(user_id=ID, max_results=TWEETS_NUM):
    query_str = f"from:{user_id} -is:reply -is:retweet"
    return client.search_recent_tweets(
        query=query_str,
        max_results=max_results,
        tweet_fields=['context_annotations', 'created_at', 'geo', 'public_metrics'])


def get_recent_replies(user_id=ID, max_results=TWEETS_NUM):
    query_str = f"from:{user_id} is:reply -is:retweet"
    return client.search_recent_tweets(
        query=query_str,
        max_results=max_results,
        tweet_fields=['context_annotations', 'created_at', 'geo', 'public_metrics', 'in_reply_to_user_id'])


def get_top_tweets(user_id=ID, max_results=TWEETS_NUM):
    query_str = f"from:{user_id} -is:reply -is:retweet"
    return client.search_recent_tweets(
        query=query_str,
        max_results=max_results,
        sort_order="relevancy",
        tweet_fields=['context_annotations', 'created_at', 'geo', 'public_metrics'])
