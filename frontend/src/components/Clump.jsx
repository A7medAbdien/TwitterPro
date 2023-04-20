import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Physics, useSphere } from "@react-three/cannon"
import * as THREE from "three"

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(0.5, 12, 12)
const baubleMaterial = new THREE.MeshMatcapMaterial({ color: "red", })

export function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
    // const texture = useTexture("/cross.jpg")
    const [ref, api] = useSphere(() => ({ args: [0.5], mass: 1, angularDamping: 0.1, linearDamping: 0.75, position: [rfs(20), rfs(20), rfs(20)] }))
    useFrame((state) => {
        for (let i = 0; i < 30; i++) {
            // Get current whereabouts of the instanced sphere
            ref.current.getMatrixAt(i, mat)
            // Normalize the position and multiply by a negative force.
            // This is enough to drive it towards the center-point.
            api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-50).toArray(), [3, 3, 3])
        }
    })
    return <instancedMesh position={[0, 0, -2]} scale={0.15} ref={ref} args={[null, null, 30]} geometry={sphereGeometry} material={baubleMaterial} />
}

export function Pointer() {
    const viewport = useThree((state) => state.viewport)
    const [, api] = useSphere(() => ({ type: "Kinematic", args: [1], position: [0, 0, 0] }))
    return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0))
}
