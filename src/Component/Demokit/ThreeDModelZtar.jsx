import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Stage,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";

const Model = () => {
  const group = useRef();
  const { scene } = useGLTF("./ztar.glb");

  useFrame(() => {
    if (group.current) {
    //   group.current.rotation.y += 0.01;
      group.current.traverse((child) => {
        if (child.isMesh) {
          // if (child.name === "Cylinder001") {
          //   child.material.color.set(
          //     hoveredMesh === "Cylinder001" ? "red" : "white"
          //   );
          // } else if (child.name === "Cylinder002") {
          //   child.material.color.set(
          //     hoveredMesh === "Cylinder002" ? "blue" : "white"
          //   );
          // }

        //   if (child.name === "Cylinder001") {
        //     child.material.color.set(cylinder001Color);
        //   } else if (child.name === "Cylinder002") {
        //     child.material.color.set(cylinder002Color);
        //   }
        }
      });
    }
  });

  // const handlePointerOver = (e) => {
  //   e.stopPropagation();
  //   setHoveredMesh(e.object.name);
  //   console.log(`Hovered over: ${e.object.name}`);
  // };

  // const handlePointerOut = (e) => {
  //   e.stopPropagation();
  //   setHoveredMesh(null);
  // };

  return (
    <primitive
      ref={group}
      object={scene}
      // {...props}
      // onPointerOver={handlePointerOver}
      // onPointerOut={handlePointerOut}
    />
  );
};

const ThreeDModelZtar = () => {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
      <ambientLight intensity={0.5} />

      <PresentationControls
        speed={1.5}
        global
        // polar={[-Math.PI / 4, Math.PI / 4]}
      >
        <Stage environment={"warehouse"}>
          <Model/>
        </Stage>
      </PresentationControls>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDModelZtar;
