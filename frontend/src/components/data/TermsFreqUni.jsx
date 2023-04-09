import { forwardRef } from 'react'
import React from 'react'
import BarChar from '../charts/BarChar'


export const TFAllUni = forwardRef(({ res }, refs) => {
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

export const TFTweetsUni = ({ res }) => {
    return <BarChar
        {...res.tweets}
    />
}

export const TFRepliesUni = ({ res }) => {
    return <BarChar
        {...res.replies}
    />
}

export const TFLikedUni = ({ res }) => {
    return <BarChar
        {...res.likedTweets}
    />
}

export const TFFLikedUni = ({ res }) => {
    return <BarChar
        {...res.followingLiked}
    />
}

