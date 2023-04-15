import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { VComm } from './VComm'
import { useControls } from 'leva'

const focusedDistance = 1.5

const Hight = 1.3

const OuterFrameWidth = 1
const OuterFrameZ = 0.05

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

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/item/:id')
    const [, setLocation] = useLocation()
    const z = (ref, n) => {
        if (ref.current) {
            const chart = ref.current.getObjectByName('test')
            chart.position.z = n
        }
    }
    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.parent.updateWorldMatrix(true, true)
            clicked.current.parent.localToWorld(p.set(0, Hight / 2, focusedDistance))
            clicked.current.parent.getWorldQuaternion(q)
            z(clicked, 1)
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
    return (
        <group
            ref={ref}
            onClick={(e) => (e.stopPropagation(), setLocation(!clicked.current === e.object ? '/' : '/item/' + e.object.name))}
            onPointerMissed={() => (setLocation('/'), z(clicked, -1))}>
            {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
        </group>
    )
}

function Frame({ url, c = new THREE.Color(), ...props }) {
    const [hidden, set] = useState()
    const d = props.d
    const image = useRef()
    const frame = useRef()
    const [, params] = useRoute('/item/:id')
    const [hovered, hover] = useState(false)
    const [rnd] = useState(() => Math.random())
    const name = getUuid(url)
    const isActive = params?.id === name
    useCursor(hovered)
    useFrame((state, dt) => {
        image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
        easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
        easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
    })

    return (
        <group {...props}>
            {/* Outer Frame */}
            <mesh
                name={name}
                onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                onPointerOut={() => hover(false)}
                scale={[OuterFrameWidth, Hight, OuterFrameZ]}
                position={[0, Hight / 2, 0]}>
                <boxGeometry />
                <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />

                {/* Inner Frame */}
                <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
                    <boxGeometry />
                    <meshBasicMaterial toneMapped={false} fog={false} />
                </mesh>

                {/* Image */}
                <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
                <Html
                    visible={false}
                    occlude
                    onOcclude={set}
                    style={{
                        transition: 'all  1s',
                        opacity: hidden ? 0 : 1,
                        transform: `scale(${hidden ? 0.5 : 1})`
                    }}
                    name='test'
                    position={[0, 0, 0]}>
                    {/* <VComm {...d} /> */}
                    {d}
                </Html>
            </mesh>

            {/* Title */}
            <Text maxWidth={1} anchorX="left" anchorY="top" position={[-0.45, 0.1 + Hight, 0]} fontSize={0.05}>
                {name.split('-').join(' ')}
            </Text>
        </group >
    )
}
