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
