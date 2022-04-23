import "./App.css";
import Minter from "./Minter";
import React, { useRef, useState, useEffect,useMemo,Suspense} from "react";
import { mintNFT } from "./util/mint-nft";
import { Canvas, useFrame, useThree,useLoader } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { useSpring, animated ,apply as applySpring, a, interpolate} from '@react-spring/three'
import { CourseEvaluationForm } from "./test";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    camera.position.set(2, 3, -4.0);

    controls.maxPolarAngle = Math.PI/2;

    controls.enableZoom = false;
    controls.update();

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
const color2 = new THREE.Color("rgba(4, 103, 57, 1)");

function Box1(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const colorMap = useLoader(TextureLoader, 'land1.png')

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [id, setId] = useState("");

  const [name, setName] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => mesh.current.rotation.x);
  // Return view, these are regular three.js elements expressed in JSX
  useEffect(() => {
    console.log(Boolean(mesh.current));
  }, []);

  const getClassName = () => {
    console.log(props.className);
    return props.className;
  };
  const white = new THREE.Color("rgba(6, 142, 78, 1)");
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => getClassName()}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 0.5, 1]} />

      <meshStandardMaterial map={colorMap} color={hovered ? "orange" : "hotpink"} />
    </mesh>
  );
}



function Stars({ position }) {
  let group = useRef()
  let theta = 0
  useFrame(() => {
    const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.01)))
    const s = Math.cos(THREE.Math.degToRad(theta * 2))
    group.current.rotation.set(r, r, r)
    group.current.scale.set(s, s, s)
  })
  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 20, 20)
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#45A29E'), transparent: true })
    const coords = new Array(3000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
    return [geo, mat, coords]
  }, [])
  return (
    <a.group ref={group} position={position}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </a.group>
  )
}
function App() {
  function Box(props) {
    // This reference will give us direct access to the mesh
    const colorMap = useLoader(TextureLoader, 'land2.png')
    const mesh = useRef();
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const [id, setId] = useState("");

    const [name, setName] = useState(false);

    const [onclick, setOnclick] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => mesh.current.rotation.x);
    // Return view, these are regular three.js elements expressed in JSX
    useEffect(() => {
      console.log(Boolean(mesh.current));
    }, []);

    const getClassName = (props) => {
      setOnclick(true);
      setShowModal(true);
      console.log(props);

      return props.className;
    };
    const white = new THREE.Color("rgba(6, 142, 78, 1)");
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => getClassName(props)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial map={colorMap} color={onclick ? "gray" : "#45A29E"}  side="BackSide"/>
      </mesh>
            
    );
  }

  function Line(){
    const edges = useMemo(() => new THREE.EdgesGeometry(Box, 15), [Box])

    return(
      <group dispose={null}>
      <mesh geometry={Box}>
        <meshStandardMaterial transparent />
      </mesh>
      <lineSegments geometry={edges} renderOrder={100}>
        <lineBasicMaterial color="black" />
      </lineSegments>
    </group>
    )
  }
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-wrap py-24">
      <div className="App" id="abc">
        <Canvas>
          <CameraController />
          <ambientLight />
          <Stars/>
          {/* <Line/> */}
          {/* <pointLight position={[10, 10, 10]} /> */}
          <Suspense fallback={null}>
  
        {/* <Line /> */}
     

       

          <Box1 position={[2.25, 0, 0]} />
          <Box1 position={[2.25, 0, 1]} />
          <Box1 position={[2.25, 0, -1]} />

          <Box1 position={[0, 0, 2.25]} />
          <Box1 position={[-1, 0, 2.25]} />
          <Box1 position={[1, 0, 2.25]} />

          <Box1 position={[-2.25, 0, 0]} />
          <Box1 position={[-2.25, 0, 1]} />
          <Box1 position={[-2.25, 0, -1]} />

          <Box1 position={[0, 0, -2.25]} />
          <Box1 position={[-1, 0, -2.25]} />
          <Box1 position={[1, 0, -2.25]} />

          <Box position={[1, 0, -0.5]} className="ABCss" />
          <Box position={[1.5, 0, -0.5]} className="ABCss" />
          <Box position={[1, 0, -1]} className="ABCss" />
          <Box position={[1.5, 0, -1]} className="ABCss" />
          <Box position={[1, 0, -1.5]} className="ABCss" />
          <Box position={[1.5, 0, -1.5]} className="ABCss" />
          <Box position={[1, 0, 0]} className="ABC" />
          <Box position={[1.5, 0, 0]} className="ABCss" />
          <Box position={[1, 0, 0.5]} className="ABCss" />
          <Box position={[1.5, 0, 0.5]} className="ABCss" />
          <Box position={[1, 0, 1]} className="ABCss" />
          <Box position={[1.5, 0, 1]} className="ABCss" />
          <Box position={[1, 0, 1.5]} className="ABCss" />
          <Box position={[1.5, 0, 1.5]} className="ABCss" />

          <Box position={[0, 0, -0.5]} className="ABCss" />
          <Box position={[0.5, 0, -0.5]} className="ABCss" />
          <Box position={[0, 0, -1]} className="ABCss" />
          <Box position={[0.5, 0, -1]} className="ABCss" />
          <Box position={[0, 0, -1.5]} className="ABCss" />
          <Box position={[0.5, 0, -1.5]} className="ABCss" />
          <Box position={[0, 0, 0]} className="ABC" />
          <Box position={[0.5, 0, 0]} className="ABCss" />
          <Box position={[0, 0, 0.5]} className="ABCss" />
          <Box position={[0.5, 0, 0.5]} className="ABCss" />
          <Box position={[0, 0, 1]} className="ABCss" />
          <Box position={[0.5, 0, 1]} className="ABCss" />
          <Box position={[0, 0, 1.5]} className="ABCss" />
          <Box position={[0.5, 0, 1.5]} className="ABCss" />

          <Box position={[-0.5, 0, -0.5]} className="ABCss" />
          <Box position={[-1, 0, -0.5]} className="ABCss" />
          <Box position={[-0.5, 0, -1]} className="ABCss" />
          <Box position={[-1, 0, -1]} className="ABCss" />
          <Box position={[-0.5, 0, -1.5]} className="ABCss" />
          <Box position={[-1, 0, -1.5]} className="ABCss" />
          <Box position={[-0.5, 0, 0]} className="ABC" />
          <Box position={[-1, 0, 0]} className="ABCss" />
          <Box position={[-0.5, 0, 0.5]} className="ABCss" />
          <Box position={[-1, 0, 0.5]} className="ABCss" />
          <Box position={[-0.5, 0, 1]} className="ABCss" />
          <Box position={[-1, 0, 1]} className="ABCss" />
          <Box position={[-0.5, 0, 1.5]} className="ABCss" />
          <Box position={[-1, 0, 1.5]} className="ABCss" />

          <Box position={[-1.5, 0, -1.5]} className="ABCss" />
          <Box position={[-1.5, 0, -1.0]} className="ABCss" />
          <Box position={[-1.5, 0, -0.5]} className="ABCss" />
          <Box position={[-1.5, 0, 0]} className="ABCss" />
          <Box position={[-1.5, 0, 1.5]} className="ABCss" />
          <Box position={[-1.5, 0, 1.0]} className="ABCss" />
          <Box position={[-1.5, 0, 0.5]} className="ABCss" />
          </Suspense>
        </Canvas>
        ,{/* <Minter></Minter> */}
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>aaaaa</div>
      <button id="mintButton" onClick={mintNFT}>
        Mint NFT
      </button> */}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full z-50">
            <div
              className="bg-black absolute top-0 left-0 right-0 w-full h-full opacity-75 cursor-pointer"
              onClick={() => setShowModal(false)}
            ></div>
            {/* content */}
            <div className="w-4/12 bg-third text-white absolute top-1/4 left-0 right-0 mx-auto -transform-y-1/2 z-50 p-8 rounded-md">
              <img src="_122074265_hi071843849.jpg"/>
              <h1 className="text-2xl font-bold text-left pt-4">
                Place 1
              </h1>

              <div className="border border-secondary my-4"></div>
              
              <div className="w-full flex justify-center"> 
              <div className="w-1/4 items-start text-md  text-blueGray-500 ">
                Current Price </div>
                <div className="w-3/4 flex justify-center">
                  <img src="ethereum.png"/>
                  1000.00 ($1,374,550.00)
           
                </div>
</div>

              <div className="flex justify-center pt-4">

                <button
                  onClick={() => setShowModal(false)}
                  className=" rounded inline-flex items-center mx-auto items-center border-2 border-secondary hover:bg-secondary text-secondary-main hover:text-white py-2 px-8 font-bold tracking-wide focus:outline-none"
                >
               <span className="px-2">Buy</span> 
            
                <i class="fa fa-wallet"></i>
          
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className=" rounded inline-flex items-center mx-auto items-center border-2 border-secondary hover:bg-secondary text-secondary-main hover:text-white py-2 px-8 font-bold tracking-wide focus:outline-none"
                >
               <span className="px-2">Cancel</span> 
            
                </button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;
