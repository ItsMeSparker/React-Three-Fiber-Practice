import { Canvas, useFrame } from '@react-three/fiber'
import { CameraControls, CameraControlsImpl, OrthographicCamera, OrbitControls} from '@react-three/drei'
import { useRef, useState } from 'react'
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

const Sphere = ({position, size }) => {
  const ref = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 2
    ref.current.rotation.x += delta * 2
    // ref.current.position.z = Math.sin(state.clock.elapsedTime) * -2

  })

  return(
    <mesh 
      position={position} 
      ref={ref}
      onPointerEnter = {(event) =>(event.stopPropagation(), setIsHovered(true)) }
      onPointerLeave ={() => setIsHovered(false)}
      onClick = {() => setIsClicked(!isClicked)}
      scale = {isClicked ? 1.25 : 1}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? "orange" : "lightblue"} wireframe = {true}/>
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

  //let each capsule that orbits around the center has its own unique characteristics
  let height = Math.random() * 0.3 + 0.1
  let radius = Math.random() * 0.15 + 0.1
  let color = ['#FF5F1F','#FF4433','#FFBF00','#C04000', '#FA3361', '#72031D', '#FB6084']
  let orbitalVectorXZ = Math.random() * 2.5 + 1.25
  let orbitalRadius = Math.random() * 10 + 5
  let positionRandomness = Math.random() * 6 - 2
  let rotationSpeed = Math.random() * 2 + 1
  let yPosition = Math.random() * 6 - 3

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * rotationSpeed
    ref.current.rotation.x += delta * rotationSpeed

    ref.current.position.x = Math.cos(state.clock.elapsedTime + orbitalVectorXZ) * orbitalRadius  + positionRandomness
    ref.current.position.z = Math.sin(state.clock.elapsedTime + orbitalVectorXZ) * orbitalRadius  + positionRandomness

  })

  return(
    <mesh position={[0, yPosition, 0]} ref={ref}>
      <capsuleGeometry args={[radius, height, 16, 16]} />
      <meshStandardMaterial color={color[colorCode]} />
    </mesh>
  )
}

const App = () => {
  // const { ACTION } = CameraControlsImpl; 

  
  return ( 
  <>
      <Canvas>
      
      {/* <CameraControls
        mouseButtons={{
          left: ACTION.ROTATE,
          middle: ACTION.DOLLY,
          right: ACTION.TRUCK,
          wheel: ACTION.DOLLY,
        }}
        touches={{
          one: ACTION.TOUCH_ROTATE,
          two: ACTION.TOUCH_DOLLY_TRUCK,
          three: ACTION.TOUCH_DOLLY_TRUCK,
        }}
      /> */}

        {/* <OrthographicCamera makeDefault position={[0, 0, 10] } zoom={20}/> */}
        <directionalLight position ={[-5, 0, 3]} intensity={2}/> //light that shines in one spot
        <ambientLight intensity = {1.5}/> //all directional light

          <group position={[0, 0, -8]}>
            <Sphere position = {[0, 0, 0]} size = {[1, 32, 32]} />
            <Torus position = {[0, 0, 0]} size = {[1.75, 0.3, 64, 64]} color={"limegreen"} />  

            {Array.from({ length: 20 }, (_, i) => (
              <Capsule key={i} colorCode={i % 7} />
            ))}
            
          </group>
          <OrbitControls enablePan = {false}/>
      </Canvas>
    </>
  )
}

export default App
