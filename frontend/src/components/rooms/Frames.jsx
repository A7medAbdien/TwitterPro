import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { VComm } from '../VComm'
import { Frame } from './Frame'
import { useControls } from 'leva'
import { doorCameraPosition } from './tweaks'
import { Robot } from '../Robot'


const GOLDENRATIO = 1.5


export const Frames = ({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) => {
    const ref = useRef()
    const clicked = useRef()
    // const door = useRef()
    const [doorClicked, setDoorClicked] = useState(false)
    const [DOOR, setDoor] = useState()
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()

    // const { position: doorCamera } = useControls('Door Camera',
    //     {
    //         position:
    //         {
    //             value: { x: 0, y: -5 },
    //             step: 0.1,
    //         },
    //     }
    // )

    const doorCameraPos = (door) => {
        if (Object.keys(doorCameraPosition).includes(door))
            return (doorCameraPosition[door])
        else console.log("this door has no camera position")
    }
    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.parent.updateWorldMatrix(true, true)

            if (isDoor(clicked)) {
                setDoor(clicked.current.name)
                setDoorClicked(true)
                doorCameraPos(clicked.current.name)
                clicked.current.parent.localToWorld(p.set(...doorCameraPos(clicked.current.name)))
                clicked.current.parent.getWorldQuaternion(q)
            } else if (isOut(clicked)) {
                setDoorClicked(false)
                // setDoor(null)
                setTimeout(setDoor, 500, null);
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
    return <group position={[0, -0.5, 0]}>

        <group
            ref={ref}
            onClick={(e) => (e.stopPropagation(), setLocation((clicked.current === e.object) ? (doorClicked) ? '/' + DOOR : '/' : '/' + e.object.name))}
            onPointerMissed={() => setLocation((doorClicked) ? '/' + DOOR : '/')}>

            {images.map(({ image, position, rotation, door, home }, i) => (

                <group key={i} position={position} rotation={rotation}>
                    {/* Door */}
                    <Frame key={"i"} {...door} />
                    {/* Home */}
                    {(home.meta == DOOR) && <Robot scale={0.15} key={i} {...home} />}
                    {/* {(home.meta == DOOR) && <Frame key={i} {...home} />} */}
                    {/* Frames */}
                    {(door.url == DOOR) && image.map((props, i) => <Frame key={i} {...props} />)}
                </group>
            ))}

        </group>
    </group>
}

const DOOR = "door"
const HOME = "home"
const isDoor = (ref) => ref.current && (ref.current.name).includes(DOOR)
const isOut = (ref) => ref.current && hasParentWithNameContainingHome(ref.current)

function hasParentWithNameContainingHome(object) {
    if (object.parent) {
        if (object.parent.name && object.parent.name.toLowerCase().includes(HOME)) {
            return true;
        } else {
            return hasParentWithNameContainingHome(object.parent);
        }
    } else {
        return false;
    }
}