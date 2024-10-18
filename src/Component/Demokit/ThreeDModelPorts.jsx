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
  const { scene } = useGLTF("./portsHelicalWaveguide.glb");

  useFrame(() => {
    if (group.current) {
        group.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
    />
  );
};

const ThreeDModelPorts = () => {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
      <ambientLight intensity={0.5} />

      <PresentationControls
        speed={1.5}
        global
      >
        <Stage environment={"warehouse"}>
          <Model />
        </Stage>
      </PresentationControls>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDModelPorts;
