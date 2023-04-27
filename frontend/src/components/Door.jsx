import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { shaderMaterial, Text, useGLTF, Sparkles, useTexture, useCursor } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'

import portalFragmentShader from './shaders/portal/fragment.js'
import portalVertexShader from './shaders/portal/vertex.js'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000'),
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })
const GOLDENRATIO = 1.5

useGLTF.preload("/portal.glb")
export function Door({ url, ...props }) {

    const name = url
    const { nodes } = useGLTF('/portal.glb')
    const portal = nodes.baked
    const portalLight = nodes.Circle
    const bakedTexture = useTexture('./baked.jpg')
    bakedTexture.flipY = false

    const portalMaterial = useRef()
    useFrame((state, delta) => {
        // console.log(portalMaterial.current)
        portalMaterial.current.uTime += delta
    })
    return <>

        <group {...props} >
            <mesh
                name={name}
                scale={[2, GOLDENRATIO, 0.05]}
                position={[0, GOLDENRATIO / 2, 0]}>
                <planeGeometry />
                <meshStandardMaterial wireframe color="#000000" opacity={0} transparent />
            </mesh>
            <mesh geometry={portal.geometry}>
                <meshBasicMaterial map={bakedTexture} />

            </mesh>
            <mesh
                geometry={portalLight.geometry}
                position={[portalLight.position.x, portalLight.position.y, portalLight.position.z]}
                rotation={portalLight.rotation}
            >
                <portalMaterial ref={portalMaterial} />
            </mesh>

            <RobotText text={name} />
        </group>
        <Sparkles
            size={1}
            scale={[2, 2, 1]}
            position={[0, 1, 4]}
            speed={0.3}
            count={30}
            raycast={() => null}
        />
    </>
}

const RobotText = ({ text, ...props }) => {
    return <Text
        color={'#CBA55D'}
        fontSize={0.5}
        maxWidth={6}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign={'center'}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
        position={[0, 2.2, -2]}
        {...props}
    >
        {text}

    </Text>
}

