import { Html, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import { useState, useEffect, useRef } from 'react'

import { FAll, FTweets, FReplies } from './components/Freq';
import { getComm, getTermFreqUni, getTermFreqBi, getUserFreq, getTopicFreq, getTimeFreq } from './api';
import { TimeReplies, TimeTweets } from './components/TimeHeatmap';
import { VComm } from './components/VComm';
import { TwoBar } from './components/charts/TwoBar';

export default function Experience() {

    const [termFreqUni, setTermFreqUni] = useState([]);
    const [topic, setTopic] = useState([]);
    const [timeFreq, setTimeFreq] = useState([]);
    const [comm, setComm] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    // useEffect(() => {
    //     Promise.all([
    //         getTermFreqUni(setTermFreqUni),
    //         getTopicFreq(setTopic),
    //         getTimeFreq(setTimeFreq),
    //         getComm(setComm),
    //     ]).then(() => {
    //         setIsLoading(false)
    //     })
    // }, [])


    return <>



        {/* <Perf position="top-left" /> */}

        {/* <OrbitControls makeDefault /> */}

        {/* <Html>
            <TwoBar {...comm.uni_term} />
            <VComm {...comm.user_rl} />
            <FTweets res={termFreqUni} />
            <FTweets res={topic} />
            <TimeTweets res={timeFreq} />
        </Html> */}

    </>
}