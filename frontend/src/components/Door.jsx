import { useState, useEffect, useLayoutEffect } from 'react'
import { Text, useGLTF, Sparkles, useTexture, useCursor } from '@react-three/drei'
import { useControls } from 'leva';


useGLTF.preload("/portal.glb");
export function Door({ url, ...props }) {

    const name = url
    const { nodes } = useGLTF('/portal.glb')
    const bakedTexture = useTexture('./baked.jpg')
    bakedTexture.flipY = false

    useEffect(() => {
        // console.log(nodes)
    }, [])

    return <>



        <group position={[0, -0.6, 6]} {...props} >
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
            <Sparkles
                size={1}
                scale={[2, 2, 1]}
                position={[0, 1, -1.5]}
                speed={0.3}
                count={30}
            />
            <RobotText />
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
        anchorX="center"
        anchorY="middle"
        position={[0, 2, -2]}
        {...props}
    >
        If you wanna get back..
        Click me!
    </Text>
}

