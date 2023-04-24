import { useState, useEffect, useRef, useMemo, Suspense, useLayoutEffect } from 'react'
import { Html, Environment, OrbitControls, MeshReflectorMaterial, useGLTF, useAnimations, Stage, Clone } from '@react-three/drei'


useGLTF.preload("/robot-draco.glb");
export function Model(props) {
    const { scene, animations, materials } = useGLTF('/robot-draco.glb')
    const { actions } = useAnimations(animations, scene)

    useLayoutEffect(() => {
        Object.values(materials).forEach((material) => {
            material.roughness = 0.2
            material.metalness = 0.1
            material.envMapIntensity = 2
        })
    }, [])

    useEffect(() => {
        console.log(actions);
        actions.Wave.play().setDuration(2.8)
        scene.traverse((obj) => obj.isMesh)
    }, [actions, scene])
    return <primitive position={[0, -0.4, 6]} envMapIntensity={5} scale={0.2} object={scene} {...props} />
}
