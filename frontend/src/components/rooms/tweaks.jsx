import { useControls } from 'leva'

const termFreq = () => {
    const { position: posTF, positionA, rA, positionB, rB, positionC, rC, positionD, rD } = useControls('TF',
        {
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
const topicsTime = () => {
    const { position: posTF, positionA, rA, positionC, rC, positionD, rD } = useControls('TT', {
        position:
        {
            value: { x: -1, y: -10 },
            step: 0.1,
        },
        positionA:
        {
            value: { x: 1.1, y: 0.2 },
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
            value: { x: 2.7, y: 1.3 },
            step: 0.1,
        },
        rC:
        {
            min: -Math.PI,
            max: Math.PI,
            step: 0.05,
            value: 1.05,
        },
        positionD:
        {
            value: { x: 3.4, y: 3.5 },
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
const users = () => {
    const { position: posTF, positionA, rA, positionC, rC, positionD, rD } = useControls('U', {
        position:
        {
            value: { x: 1, y: -7 },
            step: 0.1,
        },
        positionA:
        {
            value: { x: 1.1, y: 0.2 },
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
            value: { x: 2.7, y: 1.3 },
            step: 0.1,
        },
        rC:
        {
            min: -Math.PI,
            max: Math.PI,
            step: 0.05,
            value: 1.05,
        },
        positionD:
        {
            value: { x: 3.4, y: 3.5 },
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
        { img: 0, meta: 'tweets', position: [-positionA.x + posTF.x, 0, positionA.y + posTF.y], rotation: [0, rA, 0], url: 'UTweets' },
        { img: 0, meta: 'replies', position: [positionA.x + posTF.x, 0, positionA.y + posTF.y], rotation: [0, -rA, 0], url: 'UReplies' },

        // Left
        { img: 0, meta: 'likes', position: [-positionC.x + posTF.x, 0, positionC.y + posTF.y], rotation: [0, rC, 0], url: 'ULikes' },
        { img: 0, meta: 'fLikes', position: [positionC.x + posTF.x, 0, positionC.y + posTF.y], rotation: [0, -rC, 0], url: 'UFLikes' },
        // // Right
        { img: 0, meta: 'likes', position: [-positionD.x + posTF.x, 0, positionD.y + posTF.y], rotation: [0, rD, 0], url: 'ULikes2' },
        { img: 0, meta: 'fLikes', position: [positionD.x + posTF.x, 0, positionD.y + posTF.y], rotation: [0, -rD, 0], url: 'UFLikes2' },
    ]
}
const commonTopics = () => {
    const { position: posTF, positionA, rA, positionC, rC, positionD, rD } = useControls('Common Topics', {
        position:
        {
            value: { x: 0, y: -6.5 },
            step: 0.1,
        },
        positionA:
        {
            value: { x: 1.1, y: 0.2 },
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
            value: { x: 2.7, y: 1.3 },
            step: 0.1,
        },
        rC:
        {
            min: -Math.PI,
            max: Math.PI,
            step: 0.05,
            value: 1.05,
        },
        positionD:
        {
            value: { x: 3.4, y: 3.5 },
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
        { img: 0, meta: 'tweets', position: [-positionA.x + posTF.x, 0, positionA.y + posTF.y], rotation: [0, rA, 0], url: 'CTTweets' },
        { img: 0, meta: 'replies', position: [positionA.x + posTF.x, 0, positionA.y + posTF.y], rotation: [0, -rA, 0], url: 'CTReplies' },

        // Left
        { img: 0, meta: 'likes', position: [-positionC.x + posTF.x, 0, positionC.y + posTF.y], rotation: [0, rC, 0], url: 'CTLikes' },
        { img: 0, meta: 'fLikes', position: [positionC.x + posTF.x, 0, positionC.y + posTF.y], rotation: [0, -rC, 0], url: 'CTFLikes' },
        // // Right
        { img: 0, meta: 'likes', position: [-positionD.x + posTF.x, 0, positionD.y + posTF.y], rotation: [0, rD, 0], url: 'CTLikes2' },
        { img: 0, meta: 'fLikes', position: [positionD.x + posTF.x, 0, positionD.y + posTF.y], rotation: [0, -rD, 0], url: 'CTFLikes2' },
    ]
}

export const frames = () => {
    const { position: posOuterDoor, r: rOuterDoor } = useControls('Outer Doors', {
        position:
        {
            value: { x: -7.5, y: 2 },
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
            value: { x: -2, y: 0.5 },
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
            image: [...termFreq()],
            home: { img: 0, meta: 'door-TF', position: [0, 0, 0.6], url: 'home' },
            door: { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-TF' }
        },
        {
            position: [posInnerDoor.x, 0, posInnerDoor.y],
            rotation: [0, rInnerDoor, 0],
            image: [...topicsTime()],
            home: { img: 0, meta: 'door-TT', position: [-1, 0, -5], url: 'home' },
            door: { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-TT' },
        },
        {
            position: [-posInnerDoor.x, 0, posInnerDoor.y],
            rotation: [0, -rInnerDoor, 0],
            image: [...users()],
            home: { img: 0, meta: 'door-U', position: [1, 0, -2], url: 'home' },
            door: { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-U' },
        },
        {
            position: [-posOuterDoor.x, 0, posOuterDoor.y],
            rotation: [0, -rOuterDoor, 0],
            image: [...commonTopics()],
            home: { img: 0, meta: 'door-CT', position: [0, 0, -2.5], url: 'home' },
            door: { img: 0, meta: 'door', position: [0, 0, 5], rotation: [0, 0, 0], url: 'door-CT' },
        },

    ]
}

const GOLDENRATIO = 1.5
export const doorCameraPosition = {
    "door-TF": [0, GOLDENRATIO / 2, -2.5],
    "door-TT": [-1, GOLDENRATIO / 2, -8.5],
    "door-U": [1, GOLDENRATIO / 2, -5],
    "door-CT": [0, GOLDENRATIO / 2, -5],
}