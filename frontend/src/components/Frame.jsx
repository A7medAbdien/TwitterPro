import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Text, Environment, Html, BBAnchor } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { VComm } from './VComm'
import BarChar from './charts/Bar'
import { useSpring, animated } from 'react-spring';


const GOLDENRATIO = 1.5

export function Frame({ url, c = new THREE.Color(), ...props }) {
    const d = props.d
    const img = props.img
    const image = useRef()
    const frame = useRef()
    const [, params] = useRoute('/item/:id')
    const [hovered, hover] = useState(false)
    const [rnd] = useState(() => Math.random())
    const name = getUuid(url)
    const isActive = params?.id === name
    useCursor(hovered)
    useFrame((state, dt) => {
        // image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
        // easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
        easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
    })

    return (
        <group {...props}>
            {/* Outer Frame */}
            <mesh
                name={name}
                onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                onPointerOut={() => hover(false)}
                scale={[2, GOLDENRATIO, 0.05]}
                position={[0, GOLDENRATIO / 2, 0]}>
                <boxGeometry />
                <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />

                {/* Inner Frame */}
                <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
                    <boxGeometry />
                    <meshBasicMaterial toneMapped={false} fog={false} />
                </mesh>

                {/* Image */}
                <Image img={img} raycast={() => null} scale={0.4} position={[0, 0, 0.8]} />

            </mesh>

            {/* Title */}
            <Text maxWidth={1} anchorX="left" anchorY="top" position={[-0.45, 0.1 + GOLDENRATIO, 0]} fontSize={0.05}>
                {name.split('-').join(' ')}
            </Text>
        </group>
    )
}

function Image(props) {
    const img = props.img
    const texture = useLoader(THREE.TextureLoader, img)
    return (
        <mesh {...props}>
            <planeGeometry attach="geometry" args={[2, 2]} />
            <meshBasicMaterial
                attach="material"
                map={texture}
                toneMapped={false} />
        </mesh>
    )
}
