import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { VComm } from './VComm'
import { Frame } from './Frame'


const GOLDENRATIO = 1.5


export const Gallery = ({ images }) => (

    <group position={[0, -0.5, 0]}>

        <Frames images={images} />


    </group>

)
const DOOR = "door"
const HOME = "home"
const isDoor = (ref) => ref.current && (ref.current.name).includes(DOOR)
const isOut = (ref) => ref.current && (ref.current.name).includes(HOME)

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
    const ref = useRef()
    const clicked = useRef()
    const door = useRef()
    const [doorClicked, setDoorClicked] = useState(false)
    const [DOOR, setDoor] = useState()
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()
    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.parent.updateWorldMatrix(true, true)

            if (isDoor(clicked)) {
                setDoor(clicked.current.name)
                setDoorClicked(true)
                clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, -3))
                clicked.current.parent.getWorldQuaternion(q)
            } else if (isOut(clicked)) {
                setDoorClicked(false)
                p.set(0, 0, 7.5)
                q.identity()
            } else {
                clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
                clicked.current.parent.getWorldQuaternion(q)
            }
        } else {

            p.set(0, 0, 7.5)
            q.identity()
        }
    })
    useFrame((state, dt) => {
        easing.damp3(state.camera.position, p, 0.4, dt)
        easing.dampQ(state.camera.quaternion, q, 0.4, dt)
    })
    return (
        <group
            ref={ref}
            onClick={(e) => (e.stopPropagation(), setLocation((clicked.current === e.object) ? (doorClicked) ? '/' + DOOR : '/' : '/' + e.object.name))}
            onPointerMissed={() => setLocation((doorClicked) ? '/' + DOOR : '/')}>

            {images.map(({ image, position, rotation }, i) => (
                <group key={i} position={position} rotation={rotation}>
                    {image.map((props, i) => <Frame key={i} {...props} /> /* prettier-ignore */)}
                </group>
            ))}

        </group>
    )
}
