import sys
sys.path.insert(0, 'C:/Users/bashr/TwitterPro/backend')
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

def test_get_liked_tweets():
    tweets = get_liked_tweets(get_following)
    print(tweets)
    print(extract_hashtags(tweets))

def test_get_top_tweets():
    try:
        for tweet in get_top_tweets(E_ID,20).data :
            print(tweet)
    except:
        print(f'It seems that this ID/USERNAME:{E_ID} has no tweets')

def test():
    # test_get_trends()
    # test_get_liked_tweets()
    test_get_top_tweets()

test()