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

        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={50}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050505"
                metalness={0.5}
            />
        </mesh>
    </group>

)
const DOOR = "door"
const HOME = "home"
const isDoor = (ref) => (ref.current.name).includes(DOOR)
const isOut = (ref) => (ref.current.name).includes(HOME)

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
    const ref = useRef()
    const clicked = useRef()
    const door = useRef()
    const [doorClicked, setDoorClicked] = useState(false)
    const [DOOR, setDoor] = useState()
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()
    console.log(doorClicked);
    console.log(DOOR);
    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.parent.updateWorldMatrix(true, true)

            if (isDoor(clicked)) {
                setDoor(clicked.current.name)
                setDoorClicked(true)
                clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 0))
                clicked.current.parent.getWorldQuaternion(q)
            } else if (isOut(clicked)) {
                setDoorClicked(false)
                p.set(0, 0, 5.5)
                q.identity()
            } else {
                clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
                clicked.current.parent.getWorldQuaternion(q)
            }
        } else {
            if (doorClicked) {
                console.log(DOOR)
                door.current = ref.current.getObjectByName(DOOR)
                door.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 0))
            }
            else
                p.set(0, 0, 5.5)
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
            {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
        </group>
    )
}
