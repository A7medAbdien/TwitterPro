import { forwardRef } from 'react'
import React from 'react'
import BarChar from '../charts/BarChar'


export const UFAll = forwardRef(({ res }, refs) => {
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


export const UFReplies = ({ res }) => {
    return <BarChar
        {...res.replies}
    />
}

export const UFLiked = ({ res }) => {
    return <BarChar
        {...res.likedTweets}
    />
}

export const UFFLiked = ({ res }) => {
    return <BarChar
        {...res.followingLiked}
    />
}

