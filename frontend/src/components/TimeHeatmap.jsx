import React from 'react'
import Heatmap from './charts/Heatmap'

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


export const TimeTweets = ({ res }) => {
    return <Heatmap
        x={days}
        {...res.tweets}
    />
}

export const TimeReplies = ({ res }) => {
    return <Heatmap
        x={days}
        {...res.replies}
    />
}


