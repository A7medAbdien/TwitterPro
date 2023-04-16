import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html, BBAnchor } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { VComm } from './VComm'
import { useControls } from 'leva'
import BarChar from './charts/Bar'
import { Frame } from './Frame'

const focusedDistance = 1.7

const Hight = 2
const OuterFrameWidth = 2.5
const OuterFrameZ = 0.05

export const Gallery = ({ images }) => {


    const { position, color, visible } = useControls('sphere', {
        position:
        {
            value: { x: - 2, y: 2.7 },
            step: 0.01,
            joystick: 'invertY'
        }
    })

    return < group position={[0, -0.5, 0]} >



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
    </group >

}

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
    const ref = useRef()
    const [hidden, set] = useState(false)
    const clicked = useRef()
    const [, params] = useRoute('/item/:id')
    const [, setLocation] = useLocation()

    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.parent.updateWorldMatrix(true, true)
            clicked.current.parent.localToWorld(p.set(0, Hight / 2, focusedDistance))
            clicked.current.parent.getWorldQuaternion(q)
            set(true)
        }
        else {
            p.set(0, 0, 5.5)
            q.identity()
        }
    })
    useFrame((state, dt) => {
        easing.damp3(state.camera.position, p, 0.4, dt)
        easing.dampQ(state.camera.quaternion, q, 0.4, dt)
    })
    return <>
        <group
            ref={ref}
            onClick={(e) => (e.stopPropagation(), setLocation(!clicked.current === e.object ? '/' : '/item/' + e.object.name))}
            onPointerMissed={() => (setLocation('/'), set(false))}>
            {images.map((props) => <Frame key={props.url} {...props} hidden={hidden} set={set} /> /* prettier-ignore */)}
        </group>
    </>
}


