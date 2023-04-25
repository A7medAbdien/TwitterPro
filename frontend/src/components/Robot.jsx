import { useState, useEffect, useRef, useMemo, Suspense, useLayoutEffect } from 'react'
import { Text, Html, Environment, OrbitControls, MeshReflectorMaterial, useGLTF, useAnimations, Stage, Clone, Plane } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';


useGLTF.preload("/robot-draco.glb");
export function Model(props) {
    const { scene, animations, materials } = useGLTF('/robot-draco.glb')
    const { actions } = useAnimations(animations, scene)

    const waving = () => {
        actions.Wave.fadeIn(0.8)
        actions.Wave.play().setDuration(2.5)
        setTimeout(() => {
            actions.Wave.fadeOut(0.5)
            actions.Wave.stop()
        }, 2500);
    }

    useLayoutEffect(() => {
        Object.values(materials).forEach((material) => {
            material.roughness = 0.2
            material.metalness = 0.1
            material.envMapIntensity = 2
        })
    }, [])

    useEffect(() => {
        actions.Idle.fadeIn()
        actions.Idle.play().setDuration(5)
        scene.traverse((obj) => obj.isMesh)

        const intervalId = setInterval(() => {
            waving()
        }, 5000);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };

    }, [actions, scene])

    return <><group scale={0.2} position={[0, -0.4, 6]}>
        <primitive envMapIntensity={5} object={scene} {...props} />
        <Text

            color={'#CBA55D'}
            fontSize={0.5}
            maxWidth={6}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign={'center'}
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            anchorX="left"
            anchorY="middle"
            position={[0, 5, 0]}
        >
            If you wanna get back..
            Click me!
        </Text>
    </group>
    </>
}


