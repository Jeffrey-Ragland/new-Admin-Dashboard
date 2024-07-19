import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Stage,
  PointerLockControls,
  Environment,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";

function Model(props) {
  const group = useRef();
  const { scene } = useGLTF("./utmaps.gltf");
  const [hovered, setHovered] = useState(false);

  useFrame(() => {

      if (group.current) {
        group.current.rotation.y += 0.01;
      }

    if (group.current) {
      group.current.traverse((child) => {
        // if (child.isMesh && child.name === "Cylinder002") {
        //   child.material.color.set(hovered ? "white" : "white");
        // }
        // if (child.isMesh && child.name === "Cylinder003") {
        //   child.material.color.set(hovered ? "orange" : "white");
        // }
        // if (child.isMesh && child.name === "Cylinder005") {
        //   child.material.color.set(hovered ? "blue" : "white");
        // }
        if (child.isMesh && child.name === "Cylinder006") {
          child.material.color.set(hovered ? "red" : "white");
        }
      
        // if(child.isMesh) {
        //     console.log(child.name)
        // }
      });
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.object.name === "s1") {
      console.log("Yes, this is Body_2002_5");
    }
  };

  return (
    <primitive
      ref={group}
      object={scene}
      {...props}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={handleClick}
    />
  );
}

function App() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
      <ambientLight intensity={0.5} />

      <PresentationControls
        speed={1.5}
        global
        // polar={[-Math.PI / 4, Math.PI / 4]}
      >
        <Stage environment={"warehouse"}>
          <Model scale={0.5} />
        </Stage>
      </PresentationControls>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
