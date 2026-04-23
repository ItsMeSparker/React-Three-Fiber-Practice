import { Canvas } from '@react-three/fiber'
import './App.css'

const Cube = ({position, size, color}) => {
  return (
    //A Physical Object
      <mesh position = {position}>
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
        {/* A Red Physical Object */}
        <Cube position = {[1, 1, 2]} size={[1, 1, 1]} color={"red"} />
    
        {/* A Blue Physical Object */}
        <Cube position = {[-1, 1, 2]} size={[1, 1, 1]} color={"blue"} />

        {/* A Green Physical Object */}
        <Cube position = {[1, -1, 2]} size={[1, 1, 1]} color={"green"} />

        {/* A Yellow Physical Object */}
        <Cube position = {[-1, -1, 2]} size={[1, 1, 1]} color={"yellow"} />
      </group>
    </Canvas>
  )
}

export default App
