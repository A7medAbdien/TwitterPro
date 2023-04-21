import { useControls } from 'leva'

export const termFreq = () => {
    const { position: posTF, positionA, rA, positionB, rB, positionC, rC, positionD, rD } = useControls('TF', {
        position:
        {
            value: { x: 0, y: -6 },
            step: 0.01,
        },
        positionA:
        {
            value: { x: 1.5, y: 1 },
            step: 0.1,
        },
        rA:
        {
            min: -Math.PI,
            max: Math.PI,
            step: 0.05,
            value: -0.2,
        },
        positionB:
        {
            value: { x: 4, y: 0.5 },
            step: 0.1,
        },
        rB:
        {
            min: -Math.PI,
            max: Math.PI,
            step: 0.05,
            value: -0.2,
        },
        positionC:
        {
            value: { x: 5.7, y: 1.5 },
            step: 0.1,
        },
        rC:
        {
            min: -Math.PI,
            max: Math.PI,
            step: 0.05,
            value: 1.24,
        },
        positionD:
        {
            value: { x: 6.5, y: 3.7 },
            step: 0.1,
        },
        rD:
        {
            min: -Math.PI,
            max: Math.PI,
            step: 0.05,
            value: 1.25,
        },
    })

    return [
        // Back
        { img: 0, meta: 'tweets', position: [-positionA.x + posTF.x, 0, positionA.y + posTF.y], rotation: [0, rA, 0], url: 'TFUtweets' },
        { img: 0, meta: 'replies', position: [positionA.x + posTF.x, 0, positionA.y + posTF.y], rotation: [0, -rA, 0], url: 'TFUreplies' },

        { img: 0, meta: 'tweets', position: [-positionB.x + posTF.x, 0, positionB.y + posTF.y], rotation: [0, rB, 0], url: 'TFUtweets2' },
        { img: 0, meta: 'replies', position: [positionB.x + posTF.x, 0, positionB.y + posTF.y], rotation: [0, -rB, 0], url: 'TFUreplies2' },
        // Left
        { img: 0, meta: 'likes', position: [-positionC.x + posTF.x, 0, positionC.y + posTF.y], rotation: [0, rC, 0], url: 'TFUlikes' },
        { img: 0, meta: 'fLikes', position: [positionC.x + posTF.x, 0, positionC.y + posTF.y], rotation: [0, -rC, 0], url: 'TFUfLikes' },
        // // Right
        { img: 0, meta: 'likes', position: [-positionD.x + posTF.x, 0, positionD.y + posTF.y], rotation: [0, rD, 0], url: 'TFUlikes2' },
        { img: 0, meta: 'fLikes', position: [positionD.x + posTF.x, 0, positionD.y + posTF.y], rotation: [0, -rD, 0], url: 'TFUfLikes2' },
    ]
}

export const topicsTime = () => {
    const { position: posTF, positionA, rA, positionB, rB, positionC, rC, positionD, rD } = useControls('TT', {
        position:
        {
            value: { x: 0, y: -6 },
            step: 0.1,
        },
        positionA:
        {
            value: { x: 1.5, y: 1 },
            step: 0.1,
        },
        rA:
        {
            min: -Math.PI,
            max: Math.PI,
            step: 0.05,
            value: 0,
        },
        positionC:
        {
            value: { x: 3.8, y: 1.6 },
            step: 0.1,
        },
        rC:
        {
            min: -Math.PI,
            max: Math.PI,
            step: 0.05,
            value: 1,
        },
        positionD:
        {
            value: { x: 4.5, y: 3.7 },
            step: 0.1,
        },
        rD:
        {
            min: -Math.PI,
            max: Math.PI,
            step: 0.05,
            value: 1.25,
        },
    })

    return [
        // Back
        { img: 0, meta: 'tweets', position: [-positionA.x + posTF.x, 0, positionA.y + posTF.y], rotation: [0, rA, 0], url: 'TFBTweets' },
        { img: 0, meta: 'replies', position: [positionA.x + posTF.x, 0, positionA.y + posTF.y], rotation: [0, -rA, 0], url: 'TFBReplies' },

        // Left
        { img: 0, meta: 'likes', position: [-positionC.x + posTF.x, 0, positionC.y + posTF.y], rotation: [0, rC, 0], url: 'TFBLikes' },
        { img: 0, meta: 'fLikes', position: [positionC.x + posTF.x, 0, positionC.y + posTF.y], rotation: [0, -rC, 0], url: 'TFBFLikes' },
        // // Right
        { img: 0, meta: 'likes', position: [-positionD.x + posTF.x, 0, positionD.y + posTF.y], rotation: [0, rD, 0], url: 'TFBLikes2' },
        { img: 0, meta: 'fLikes', position: [positionD.x + posTF.x, 0, positionD.y + posTF.y], rotation: [0, -rD, 0], url: 'TFBFLikes2' },
    ]
}

export const imagess = () => {
    const { position: posOuterDoor, r: rOuterDoor } = useControls('Outer Doors', {
        position:
        {
            value: { x: -8, y: 1.25 },
            step: 0.01,
        },
        r:
        {
            min: 0,
            max: 2 * Math.PI,
            step: 0.05,
            value: 0.95,
        },
    })
    const { position: posInnerDoor, r: rInnerDoor } = useControls('Inner Doors', {
        position:
        {
            value: { x: -2.5, y: -2 },
            step: 0.01,
        },
        r:
        {
            min: 0,
            max: 2 * Math.PI,
            step: 0.05,
            value: 0.15,
        },
    })


    return [
        {
            position: [posOuterDoor.x, 0, posOuterDoor.y],
            rotation: [0, rOuterDoor, 0],
            image: [...termFreq(),
            { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-termFreqUni' },
            { img: 0, meta: 'home', position: [0, 0, posOuterDoor.y], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
            ]
        },
        // {
        //     position: [-posOuterDoor.x, 0, posOuterDoor.y],
        //     rotation: [0, -rOuterDoor, 0],
        //     image: [
        //     { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-termFreqBi' },
        //     { img: 0, meta: 'home', position: [0, 0, posOuterDoor.y], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
        //     ]
        // },
        {
            position: [posInnerDoor.x, 0, posInnerDoor.y],
            rotation: [0, rInnerDoor, 0],
            image: [...topicsTime(),
            { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-b' },
            { img: 0, meta: 'home', position: [0, 0, posInnerDoor.y], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
            ]
        },
        // {
        //   position: [-posInnerDoor.x, 0, posInnerDoor.y],
        //   rotation: [0, -rInnerDoor, 0],
        //   image: [
        //     { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-b' },
        //     { img: 0, meta: 'home', position: [0, 0, 3], rotation: [-Math.PI / 2, 0, 0], url: 'home' },
        //   ]
        // },
    ]
}