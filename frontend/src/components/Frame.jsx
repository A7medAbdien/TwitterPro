import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html, BBAnchor } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { VComm } from './VComm'
import BarChar from './charts/Bar'
import { useSpring, animated } from 'react-spring';

const focusedDistance = 1.7

const Hight = 2
const OuterFrameWidth = 2.5
const OuterFrameZ = 0.05

export function Frame({ url, c = new THREE.Color(), ...props }) {
    const type = props.type
    const select = props.set
    const data = props.data
    const outerFrame = useRef()

    const image = useRef()
    const frame = useRef()
    const [, params] = useRoute('/item/:id')
    const [hovered, hover] = useState(false)
    const [rnd] = useState(() => Math.random())
    const name = getUuid(url)

    const isActive = params?.id === name
    const selected = props.hidden && isActive

    useCursor(hovered)
    useFrame((state, dt) => {
        image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
        if (!selected) {
            easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
            easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
        } else {
            if (frame.current.material.color != "white")
                easing.dampC(frame.current.material.color, 'white', 0.7, dt)
            easing.damp3(image.current.scale, [0.85 * (selected ? 0.01 : 1), 0.9 * (selected ? 0.01 : 1), 1], 0.2, dt)
        }
    })

    const [showComponent, setShowComponent] = useState(false);
    const camera = useThree((state) => state.camera)
    const getFrameDimensions = (ref) => {
        const boundingBox = new THREE.Box3();
        boundingBox.setFromObject(ref.current);

        const max = boundingBox.max
        const min = boundingBox.min
        // console.log(max);
        max.project(camera);
        min.project(camera);

        // This converts from [-1, 1] to [0, windowWidth]
        const left = (1 + max.x) / 2 * window.innerWidth;
        const right = (1 + min.x) / 2 * window.innerWidth;
        const top = (1 + max.y) / 2 * window.innerHeight;
        const bottom = (1 + min.y) / 2 * window.innerHeight;

        const width = Math.abs(right - left) * 0.9
        const height = Math.abs(top - bottom) * 0.9
        return [height, width]
    }

    useEffect(() => {
        setShowComponent(true);
    }, [])


    const fadeInAnimation = useSpring({
        opacity: selected ? 1 : 0,
        from: { opacity: 0 },
        config: { duration: 2000 }
    });


    return (
        <group {...props}>
            {/* Outer Frame */}
            <mesh
                ref={outerFrame}
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
                    <meshBasicMaterial color={"wight"} toneMapped={false} fog={false} />
                </mesh>

                {/* Chart */}
                {showComponent && selected && (
                    <BBAnchor anchor={[-0.9, 0.9, 0.05]}>
                        <Html
                            occlude
                            onOcclude={select}
                            style={{
                                visibility: selected ? 'visible' : 'hidden',
                            }}
                            name='test'
                        >
                            <animated.div style={fadeInAnimation}>
                                <Chart data={data} dimensions={getFrameDimensions(outerFrame)} type={type} />
                            </animated.div>
                        </Html>
                    </BBAnchor>
                )}

                {/* Image */}
                <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
            </mesh>

            {/* Title */}
            <Text maxWidth={1} anchorX="left" anchorY="top" position={[-0.45, 0.1 + Hight, 0]} fontSize={0.05}>
                {name.split('-').join(' ')}
            </Text>
        </group >
    )
}


const Chart = ({ data, dimensions, type }) => {
    // console.log(type);
    switch (type) {
        case "bar":
            return <BarChar {...data} dimensions={dimensions} />

        case "venn":
            return <VComm {...data} dimensions={dimensions} />

        default:
            break;
    }
}