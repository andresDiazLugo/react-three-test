import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { useRef, useState } from 'react'
import * as THREE from 'three'

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
  const [isHovered, setIsHovered] = useState(false)

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta
    }
  })


  return (
    <mesh
    position={position}
    ref={ref}
    onPointerEnter={(event) => {
      event.stopPropagation()
      setIsHovered(true)
    }}
    onPointerLeave={() => setIsHovered(false)}
  >
    <sphereGeometry args={size} />
    <meshStandardMaterial color={isHovered ? 'orange' : 'blue'} wireframe />
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

function App() {

  return (
     <Canvas>
       <directionalLight position={[0,0,2]}/>
       <ambientLight intensity={0-1} />
       {/* <group position={[0, 1, 2]}>
          <Cube position={[1,0,0]} color='green' size={[1,1,1]}/>
          <Cube position={[-1,0,0]} color='hotpink' size={[1,1,1]}/>
          
          <Cube position={[-1,-2,0]} color='blue' size={[1,1,1]}/>
          <Cube position={[1,-2,0]} color='yellow' size={[1,1,1]}/>
       </group> */}
      {/* <Cube position={[0,0,0]} color='orange' size={[1,1,1]}  /> */}
      <Sphere position={[0, 0, 0]} size={[1, 30, 30]}/>
      {/* <Torus position={[2, 0, 0]} size={[0.8, 0.1, 30, 30]} color={"blue"}/>
      <TorusKnot position={[-2, 0, 0]} size={[0.5, 0.1, 1000, 50]} color={"yellow"}/> */}
     </Canvas>
    
  )
}

export default App
