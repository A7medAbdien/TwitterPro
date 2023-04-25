import { useState, useEffect, useRef, useMemo, Suspense, useLayoutEffect } from 'react'
import { Html, Environment, OrbitControls, MeshReflectorMaterial, useGLTF, useAnimations, Stage, Clone } from '@react-three/drei'
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

    return <><group>
        <primitive position={[0, -0.4, 6]} envMapIntensity={5} scale={0.2} object={scene} {...props} />
        {/* <Annotation
            scale={0.5}
            position={[0, 0, 6]}>
            <h1>HI</h1>
        </Annotation> */}
        {/* <Html
            position={[0, 0, 6]}
        >
        </Html> */}
        <Html
            scale={0.5}
            position={[0.2, 0.5, 6]}
            transform
            occlude="blending"

        >
            <div className="annotation"><h1>HI</h1></div>
        </Html>
    </group>
    </>
}


function Annotation({ children, ...props }) {
    return (
        <Html
            {...props}
            transform
            occlude="blending"
            geometry={
                /** The geometry is optional, it allows you to use any shape.
                 *  By default it would be a plane. We need round edges here ...
                 */
                <planeGeometry args={[1.66, 0.47, 0.24]} />
            }>
            <h1>HI</h1>
            <div className="annotation">{children}</div>
        </Html>
    )
}
