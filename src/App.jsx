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
    // ref.current.position.z = Math.sin(state.clock.elapsedTime) * -2

  })

  return(
    <mesh position={position} ref={ref}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} wireframe = {true}/>
    </mesh>
  )
}

const Torus = ({position, size, color}) => {
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 2
    ref.current.rotation.x += delta * 1
    // ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2

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
    ref.current.position.z = Math.cos(state.clock.elapsedTime) * 0.25

  })

  return(
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

const Capsule = ({colorCode}) => {
  const ref = useRef()
  let height = Math.random() * 0.3 + 0.1
  let radius = Math.random() * 0.15 + 0.1
  let color = ['#FF5F1F','#FF4433','#FFBF00','#C04000', '#FA3361', '#72031D', '#FB6084']
  let orbitalVectorXZ = Math.random() * 2.5 + 1.25
  let orbitalVectorY = Math.random() * 0.25 + 0.1 
  let orbitalRadius = Math.random() * 2.5 + 1.75
  let positionRandomness = Math.random() * 4

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 2
    ref.current.rotation.x += delta * 2

    ref.current.position.x = Math.cos(state.clock.elapsedTime) * orbitalRadius * orbitalVectorXZ + positionRandomness
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * orbitalRadius * orbitalVectorY + positionRandomness
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * orbitalRadius * orbitalVectorXZ + positionRandomness

  })

  return(
    <mesh position={[0, 0, 0]} ref={ref}>
      <capsuleGeometry args={[radius, height, 16, 16]} />
      <meshStandardMaterial color={color[colorCode]} />
    </mesh>
  )
}

const App = () => {

  return ( 
  
    <Canvas>

      <directionalLight position ={[0, 0, 3]} intensity={1}/> //light that shines in one spot
      <ambientLight intensity = {1.5}/> //all directional light

      {/*
      <group>
        <Cube position = {[1, 1, 2]} size={[1, 1, 1]} color={"red"} />
    
        <Cube position = {[-1, 1, 2]} size={[1, 1, 1]} color={"blue"} />

        <Cube position = {[1, -1, 2]} size={[1, 1, 1]} color={"green"} />
        
        <Cube position = {[-1, -1, 2]} size={[1, 1, 1]} color={"yellow"} />
      </group> 
      */}
      <group position={[0, 0, -12]}>
        <Sphere position = {[0, 0, 0]} size = {[1, 32, 32]} color={"lightblue"} />
        <Torus position = {[0, 0, 0]} size = {[1.75, 0.3, 64, 64]} color={"limegreen"} />  
        {/* <TorusKnot position = {[2, -2, 0]} size = {[1, 0.2, 64, 32]} color={"lime"} />   */}
        <Capsule colorCode={0} />
        <Capsule colorCode={1} />
        <Capsule colorCode={2} />

        {Array.from({ length: 15 }, (_, i) => (
          <Capsule key={i} colorCode={i % 7} />
        ))}
      </group>
    </Canvas>
  )
}

export default App
