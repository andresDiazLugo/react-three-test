/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { MeshWobbleMaterial, OrbitControls, useHelper } from '@react-three/drei'
import { useControls } from 'leva'

interface Props{
  position: [number, number, number]
  size: [number, number, number]
}
// const Cube = ({ position, size, color }:Props) =>{
//   const ref:React.MutableRefObject<undefined> = useRef()

//   useFrame((state, delta)=>{
//     ref.current.rotation.y += delta
//     ref.current.rotation.x += delta * 2.0
//     ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2
//     console.log(state.clock.elapsedTime)
//   })

//   return(
//     <mesh position={position} ref={ref} >
//           <boxGeometry args={size} />
//           <meshStandardMaterial color={color}/>
//     </mesh>
//   )
// }
const Sphere = ({ position, size }:Props) => {
  const ref = useRef<THREE.Mesh>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovered, _setIsHovered] = useState(false)
  // const [isCliked, _setIsClicked] = useState(false)

  useFrame((_state, delta) => {
    const speed = isHovered ? 1 : 0.2
    if (ref.current) {
      ref.current.rotation.y += delta + speed
    }
  })


  return (
    <mesh
    position={position}
    ref={ref}
    // onPointerEnter={(event) => {
    //   event.stopPropagation()
    //   setIsHovered(true)
    // }}
    // onPointerLeave={() => setIsHovered(false)}
    // onClick={()=> setIsClicked(!isCliked)}
    // scale={isCliked ? 2 : 1}
  >
    <sphereGeometry args={size} />
    <MeshWobbleMaterial factor={0.1} color={'orange'} speed={10} wireframe />
    {/* <meshStandardMaterial color={isHovered ? 'orange' : 'blue'} wireframe /> */}
  </mesh>
  )
}

// const Torus = ({ position, size, color }) => {
  
//   return (
//     <mesh position={position}>
//       <torusGeometry args={size}/>
//       <meshStandardMaterial color={color}/>
//     </mesh>
//   )
// }

// const TorusKnot = ({ position, size, color }) => {
//   const ref:React.MutableRefObject<undefined> = useRef()

//   useFrame((state, delta)=>{
//     ref.current.rotation.y += delta
//     ref.current.rotation.x += delta * 2.0
//     ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2
//     console.log(state.clock.elapsedTime)
//   })
  
//   return (
//     <mesh position={position} ref={ref}>
//       <torusKnotGeometry args={size} />
//       <meshStandardMaterial color={color}/>
//     </mesh>
//   )
// }

export const Scene = ()=>{
  const  directionLightRef = useRef()
  // @ts-ignore
  useHelper(directionLightRef, THREE.DirectionalLightHelper,0.5, "black")
  const { lightColor } = useControls({
    lightColor: "white",
  })
  return(
    <>
      <directionalLight 
      position={[0,0,2]}
      intensity={0.5}
      // @ts-expect-error

      ref={directionLightRef}
      color={lightColor}
      />
      <ambientLight intensity={0-1} />
       {/* <group position={[0, 1, 2]}>
          <Cube position={[1,0,0]} color='green' size={[1,1,1]}/>
          <Cube position={[-1,0,0]} color='hotpink' size={[1,1,1]}/>
          
          <Cube position={[-1,-2,0]} color='blue' size={[1,1,1]}/>
          <Cube position={[1,-2,0]} color='yellow' size={[1,1,1]}/>
       </group> */}
      {/* <Cube position={[0,0,0]} color='orange' size={[1,1,1]}  /> */}
      <Sphere position={[0, 0, 0]} size={[1, 30, 30]}/>
      <OrbitControls/>
      {/* <Torus position={[2, 0, 0]} size={[0.8, 0.1, 30, 30]} color={"blue"}/>
      <TorusKnot position={[-2, 0, 0]} size={[0.5, 0.1, 1000, 50]} color={"yellow"}/> */}
    </>
  )
}

function App() {

  return (
     <Canvas>
        <Scene/>
     </Canvas>
    
  )
}

export default App
