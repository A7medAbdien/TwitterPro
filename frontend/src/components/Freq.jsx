import { forwardRef } from 'react'
import React from 'react'
import BarChar from './charts/BarChar'


export const FAll = forwardRef(({ res }, refs) => {
    const dataList = Object.values(res).map(data => data);

    return <>
        {dataList.map((data, index) => {
            refs.current[index] = React.createRef();
            return (
                <BarChar
                    key={index}
                    ref={refs.current[index]}
                    {...data}
                />
            );
        })}
    </>
})

export const FTweets = ({ res }) => {
    return <BarChar
        {...res.tweets}
    />
}

export const FReplies = ({ res }) => {
    return <BarChar
        {...res.replies}
    />
}

export const FLiked = ({ res }) => {
    return <BarChar
        {...res.likedTweets}
    />
}

export const FFLiked = ({ res }) => {
    return <BarChar
        {...res.followingLiked}
    />
}

