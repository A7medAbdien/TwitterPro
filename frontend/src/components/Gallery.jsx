import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html, BBAnchor } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { VComm } from './VComm'
import { useControls } from 'leva'

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
    // let imagesHidden = []
    // let allF = []
    // images.map((props) => imagesHidden[getUuid(props.url)] = false)
    // images.map((props) => allF[getUuid(props.url)] = false)
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
            // z(clicked, 1)
            set(true)
            // const name = clicked.current.name
            // imagesHidden[name] = true
            // set(imagesHidden)
            // console.log(clicked.current.uuid);
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
        {/* <Html
            occlude
            onOcclude={set}
            style={{
                visibility: hidden ? 'visible' : 'hidden',
                transition: hidden ? 'all  1.5s' : 'all  0s',
                transitionDelay: hidden ? '1.5s' : '0s',
                opacity: hidden ? 1 : 0,
                transform: `opacity(${hidden ? 1 : 0})`
            }}
            name='test'
            position={[-2, 2.7, 0.05]}
        >
            <VComm {...images[0].d} />
        </Html> */}

        <group
            ref={ref}
            onClick={(e) => (e.stopPropagation(), setLocation(!clicked.current === e.object ? '/' : '/item/' + e.object.name))}
            onPointerMissed={() => (setLocation('/'), set(false))}>
            {images.map((props) => <Frame key={props.url} {...props} hidden={hidden} set={set} /> /* prettier-ignore */)}
        </group>
    </>
}

function Frame({ url, c = new THREE.Color(), ...props }) {
    const h = props.hidden
    console.log(h);
    const set = props.set
    const d = props.d
    const bb = useRef()

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


    const camera = useThree((state) => state.camera)
    const getFrameRadius = (ref) => {
        const boundingBox = new THREE.Box3();
        boundingBox.setFromObject(ref.current);

        const max = boundingBox.max
        const min = boundingBox.min
        console.log(max);
        max.project(camera);
        min.project(camera);

        // This converts from [-1, 1] to [0, windowWidth]
        const left = (1 + max.x) / 2 * window.innerWidth;
        const right = (1 + min.x) / 2 * window.innerWidth;
        const top = (1 + max.y) / 2 * window.innerHeight;
        const bottom = (1 + min.y) / 2 * window.innerHeight;

        const width = right - left
        const hight = top - bottom
        return [width, hight]
    }

    useEffect(() => {
        // console.log(hidden);

        // console.log(d);
        // console.log(getFrameRadius(bb));
    }, [])
    return (
        <group {...props}>
            {/* Outer Frame */}
            <mesh
                ref={bb}
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

                <BBAnchor anchor={[-1, 1, 0.05]}>
                    <Html
                        occlude
                        onOcclude={set}
                        style={{
                            visibility: h ? 'visible' : 'hidden',
                            transition: h ? 'all  1.5s' : 'all  0s',
                            transitionDelay: h ? '1.5s' : '0s',
                            opacity: h ? 1 : 0,
                            transform: `opacity(${h ? 1 : 0})`
                        }}
                        name='test'
                        position={[0, 0, -0.05]}
                    >
                        <VComm {...d} />
                    </Html>
                </BBAnchor>

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
