# Twitter Dashboard, I will take Elon Musk as an example

this project helps to answer, what I can twit today? The Dashboard will show...
1. the most liked tweets
2. the tended tweets/ as a hashtags
3. what the user following liked yesterday
4. what the user followers liked yesterday

## would like to add, but only for the enterprise

when the user was active, [Account Activity API](https://developer.twitter.com/en/docs/twitter-api/enterprise/account-activity-api/overview)

I use search_recent_tweets, rather than all cuz I need academic research access to use search_all_tweets

# Concepts

1. using social media API
2. extracting features/insights from the tweets
3. data visualization

# Might add

google trends for the most trends, But IDK how this might help?!

# My process will be

1. request access to Twitter api - 3/26 👍 
2. set backend and frontend services - 3/27 👍
3. start using Twitter api - 3/28 👍
4. set a database 
5. building the frontend, dashboard

# Not sure to add or not

1. let chatGPT write a tweet about the trends and publish it
2. analyses the result after 7 days

# Recourses

1. set backend and frontend services:
   1. [Docker video](https://www.youtube.com/watch?v=Jx39roFmTNg)
   2. [Microsoft doc](https://learn.microsoft.com/en-us/training/modules/dotnet-microservices/5-exercise-create-docker-compose-file)


# Analysis

I will be trying to answer main nine questions as a stoker:

1. What user tweet about? (Bar Chart TF)
2. What user replies about? (TF)
3. What user likes? (TF)
4. What followings like? (TF)

5. When user tweet? Time at day
6. When user replies? Time at day

7. Who most user replies to? (ID)
8. Who most user likes? (ID)
9. Who most followings like? (ID)

10. What Twitter says about user tweets? (context_annotations)
11. What Twitter says about user replies? (context_annotations)
12. What Twitter says about user likes? (context_annotations)
13. What Twitter says about following likes? (context_annotations)

14. What common (terms) user likes and following likes? "venn diagram"
15. What common (context_annotations) user likes and following likes? "venn diagram"
16. Who common replies and likes? "venn diagram"
17. Who common user likes and following likes? "venn diagram" (Bi Char)

17. How much replies to followings? (Bi Char)
18. Most replied to following? (Bar Char)

# Additional iterations

1. Adding numpy
2. naming