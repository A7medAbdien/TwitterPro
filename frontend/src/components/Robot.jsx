import { useState, useEffect, useLayoutEffect } from 'react'
import { Text, useGLTF, useAnimations, useCursor } from '@react-three/drei'
import { useControls } from 'leva';


useGLTF.preload("/robot-draco.glb");
export function Robot({ url, ...props }) {
    const { scene, animations, materials } = useGLTF('/robot-draco.glb')
    const { actions } = useAnimations(animations, scene)
    let stableState = "Idle"
    const [actionName, setAction] = useState(stableState)
    const [hovered, hover] = useState(false)
    const name = url
    useCursor(hovered)

    const { actionNam } = useControls('Robot-Chan', {
        actionNam: { options: Object.keys(actions) }
    })

    useLayoutEffect(() => {
        Object.values(materials).forEach((material) => {
            material.roughness = 0.2
            material.metalness = 0.1
            material.envMapIntensity = 2
        })
    }, [])

    useEffect(() => {

        const action = actions[actionName]
        action.reset().fadeIn(1).play().setDuration(3)

        setTimeout(() => {
            stableState = "Dance"
            setAction(stableState)
        }, 20000);
        return () => {
            action.fadeOut(1)
        }

    }, [actionName])

    return <><group {...props} >

        <mesh
            name={name}
            onPointerOver={(e) => (e.stopPropagation(), setAction("Wave"), hover(true))}
            onPointerOut={() => setAction(stableState)}
        >
            <group>
                <primitive envMapIntensity={5} object={scene} />
            </group>
        </mesh>
        {actionName == "Wave" && <RobotText />}
    </group>
    </>
}

const RobotText = (props) => {
    return <Text
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
        {...props}
    >
        If you wanna get back..
        Click me!
    </Text>
}

