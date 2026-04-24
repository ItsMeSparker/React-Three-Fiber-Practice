import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import './App.css'

const Cube = ({position, size, color}) => {
  const ref = useRef() 
  //useRef = hook that allows us to create a reference to a DOM element or a React component, 
  //which we can then use to access and manipulate that element or component directly.

  //useFrame is a hook that allows us to run a function on every frame of the animation loop
  useFrame((state, delta) => {
    //delta = the different in time between current frame and last frame
    ref.current.rotation.y += delta * 2
    ref.current.rotation.x += delta * 2
    ref.current.position.z = Math.cos(state.clock.elapsedTime) * 2

  })

  return (
    //A Physical cube with adjustable position, size, and color
    //mesh = a 3D object that can be rendered in the scene
      <mesh position = {position} ref={ref}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color}/>
      </mesh>
  )
}

const Sphere = ({position, size, color}) => {
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 2
    ref.current.rotation.x += delta * 2
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2

  })

  return(
    <mesh position={position} ref={ref}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const Torus = ({position, size, color}) => {
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 2
    ref.current.rotation.x += delta * 2
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2

  })

  return(
    <mesh position={position} ref={ref}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const TorusKnot = ({position, size, color}) => {
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 2
    ref.current.rotation.x += delta * 2
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2

  })

  return(
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const App = () => {

  return ( 
    //Canvas is the main component that sets up the 3D rendering context and provides a space for us to render our 3D objects
    <Canvas>

      <directionalLight position ={[0, 0, 3]}/> //light that shines in one spot
      <ambientLight intensity = {1.5}/> //all directional light

      {/*
      <group>
        <Cube position = {[1, 1, 2]} size={[1, 1, 1]} color={"red"} />
    
        <Cube position = {[-1, 1, 2]} size={[1, 1, 1]} color={"blue"} />

        <Cube position = {[1, -1, 2]} size={[1, 1, 1]} color={"green"} />
        
        <Cube position = {[-1, -1, 2]} size={[1, 1, 1]} color={"yellow"} />
      </group> 
      */}

      <Sphere position = {[-2, 0, 0]} size = {[2, 32, 32]} color={"hotpink"} />
      <Torus position = {[2, 2, 0]} size = {[1, 0.5, 30, 30]} color={"cyan"} />  
      <TorusKnot position = {[2, -2, 0]} size = {[1, 0.2, 64, 32]} color={"lime"} />  

    </Canvas>
  )
}

export default App
