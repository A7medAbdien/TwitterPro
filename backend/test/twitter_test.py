import sys
# sys.path is a list of absolute path strings
sys.path.insert(0, 'C:/Users/bashr/TwitterPro/backend')
# sys.path.append()
from twitter import *
from conf import *


def test_get_trends():
    trends = get_trends()   
    TRENDS = []
    # regexp = re.compile(r'[ء-ي]+')
    for value in trends:
        for trend in value['trends']:
            trend_name = trend['name']
            # TRENDS.append(trend_name[::-1]) if regexp.search(trend_name) else TRENDS.append(trend_name)
            TRENDS.append(trend_name)
    print(TRENDS)

def test_get_followers_liked_tweets():
    print(get_followers_liked_tweets())

def test_get_top_tweets():
    try:
        for tweet in get_top_tweets(MY_ID).data :
            print(tweet.public_metrics)
    except:
        print(f'It seems that this ID/USERNAME:{id} has no tweets')

def test():
    test_get_trends()
    test_get_followers_liked_tweets()
    test_get_top_tweets()

test()