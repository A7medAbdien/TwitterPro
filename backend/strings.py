from cProfile import label

keys = {'tweets': 0, 'replies': 0, 'likedTweets': 0, 'followingLiked': 0,
        'following': 0}
USER = "Elon musk"

tf_uni_tweets = f"Most terms in {USER} tweets"
tf_uni_replies = f"Most terms in {USER} replies"
tf_uni_liked = f"Most terms in {USER} liked tweets"
tf_uni_fliked = f"Most terms in {USER} following liked tweets"
tf_uni_titles = {'tweets': tf_uni_tweets, 'replies': tf_uni_replies, 'likedTweets': tf_uni_liked,
                 'followingLiked': tf_uni_fliked}

tf_bi_tweets = f"Most terms in {USER} tweets"
tf_bi_replies = f"Most terms in {USER} replies"
tf_bi_liked = f"Most terms in {USER} liked tweets"
tf_bi_fliked = f"Most terms in {USER} following liked tweets"
tf_bi_titles = {'tweets': tf_bi_tweets, 'replies': tf_bi_replies, 'likedTweets': tf_bi_liked,
                'followingLiked': tf_bi_fliked}

user_replies = f"Most account {USER} replies to"
user_liked = f"Most account {USER} liked its tweet"
user_fliked = f"Most account {USER} following likes its tweet"
user_titles = {'replies': user_replies, 'likedTweets': user_liked, 'followingLiked': user_fliked}

topic_tweets = f"Most topic {USER} tweets about"
topic_replies = f"Most topic {USER} replies about"
topic_liked = f"Most topic {USER} liked tweets about"
topic_fliked = f"Most topic {USER} following liked tweets about"
topic_titles = {'tweets': topic_tweets, 'replies': topic_replies, 'likedTweets': topic_liked,
                'followingLiked': topic_fliked}

time_tweets = f"Times {USER} tweets at"
time_replies = f"Times {USER} replies at"
time_titles = {'tweets': time_tweets, 'replies': time_replies}

comm_keys = {'uni_terms': 0, 'bi_terms': 0, 'topic': 0, 'user': 0,
             'user_rl': 0}
comm_uni = {
    'title': f"Common Terms between {USER} and Followings",
    'xLabel': "Terms (Uni)",
    'yLabel': "Frequency",
}
comm_bi = {
    'title': f"Common Terms between {USER} and Followings",
    'xLabel': "Terms (Bi)",
    'yLabel': "Frequency",
}
comm_topic = {
    'title': f"Common Topics between {USER} and Followings",
    'xLabel': "Topics",
    'yLabel': "Frequency",
}
comm_user = {
    'title': f"Common Liked accounts by {USER} and Followings",
    'xLabel': "Accounts (usernames)",
    'yLabel': "Frequency",
}
comm_user_rl = {
    'title': f"Common accounts {USER} replies and likes their tweets",
    'xLabel': "Accounts (usernames)",
    'yLabel': "Frequency",
    'a': "Replies",
    'b': "Likes"
}
comm_meta = {
    'uni_term': comm_uni, 'bi_term': comm_bi, 'topic': comm_topic, 'user': comm_user,
    'user_rl': comm_user_rl
}
