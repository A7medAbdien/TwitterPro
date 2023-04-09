import { forwardRef } from 'react'
import React from 'react'
import BarChar from '../charts/BarChar'


export const TFAllBi = forwardRef(({ res }, refs) => {
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

export const TFTweetsBi = ({ res }) => {
    return <BarChar
        {...res.tweets}
    />
}

export const TFRepliesBi = ({ res }) => {
    return <BarChar
        {...res.replies}
    />
}

export const TFLikedBi = ({ res }) => {
    return <BarChar
        {...res.likedTweets}
    />
}

export const TFFLikedBi = ({ res }) => {
    return <BarChar
        {...res.followingLiked}
    />
}

