import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import './App.css'

const Cube = ({position, size, color}) => {
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.x += delta //= the different in time between current frame and last frame
  })

  return (
    //A Physical cube with adjustable position, size, and color
      <mesh position = {position} ref={ref}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color}/>
      </mesh>
  )
}

const App = () => {

  return ( 
    <Canvas>

      <directionalLight position ={[0, 0, 3]}/>
      <ambientLight intensity = {1.5}/>

      
      <group>
        <Cube position = {[1, 1, 2]} size={[1, 1, 1]} color={"red"} />
    
        <Cube position = {[-1, 1, 2]} size={[1, 1, 1]} color={"blue"} />

        <Cube position = {[1, -1, 2]} size={[1, 1, 1]} color={"green"} />
        
        <Cube position = {[-1, -1, 2]} size={[1, 1, 1]} color={"yellow"} />
      </group> 

    </Canvas>
  )
}

export default App
