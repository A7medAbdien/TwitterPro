import re
import tweepy
from conf import *

auth = tweepy.OAuthHandler(API_KEY, API_SECRET_KEY)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)


def get_trends():
    trends = api.get_place_trends(id = WEOID)
    
    TRENDS = []
    regexp = re.compile(r'[ء-ي]+')
    
    for value in trends:
        for trend in value['trends']:
            trend_name = trend['name']
            TRENDS.append(trend_name[::-1]) if regexp.search(trend_name) else TRENDS.append(trend_name)
            
    return TRENDS


trends = get_trends()

