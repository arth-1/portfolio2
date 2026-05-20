"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 1800;

export default function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const accentColor = new THREE.Color("#7ef9ff");
    const dimColor = new THREE.Color("#1a3a3f");
    const whiteColor = new THREE.Color("#f5f5f5");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles across space — more concentrated in center
      const spread = Math.random() < 0.7 ? 8 : 20;
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

      // Color mixing
      const t = Math.random();
      const color = t < 0.08
        ? accentColor
        : t < 0.15
        ? whiteColor.clone().lerp(accentColor, 0.3)
        : dimColor;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varied sizes — most very small, few larger
      sizes[i] = Math.random() < 0.05 ? Math.random() * 3 + 1.5 : Math.random() * 1.2 + 0.2;
    }

    return { positions, colors, sizes };
  }, []);

  // Per-particle drift velocities
  const velocities = useMemo(() => {
    const v = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      v[i * 3] = (Math.random() - 0.5) * 0.001;
      v[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.0005;
    }
    return v;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    geo.setAttribute("particleColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouseX: { value: 0 },
        mouseY: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 particleColor;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        
        void main() {
          vColor = particleColor;
          vec3 pos = position;
          
          // Slow drift
          pos.x += sin(time * 0.3 + pos.y * 0.5) * 0.05;
          pos.y += cos(time * 0.2 + pos.x * 0.5) * 0.05;
          
          // Mouse influence — subtle push
          vec2 mouse = vec2(mouseX, mouseY) * 5.0;
          float dist = length(pos.xy - mouse);
          float influence = smoothstep(3.0, 0.0, dist) * 0.3;
          pos.xy += normalize(pos.xy - mouse) * influence;
          
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPos;
          
          // Depth-based fade for void effect at bottom
          float depthFade = clamp(1.0 - (-mvPos.z - 1.0) / 8.0, 0.0, 1.0);
          float heightFade = smoothstep(-5.0, 0.0, pos.y); // fade at bottom
          vAlpha = depthFade * heightFade * 0.8;
          
          gl_PointSize = size * (300.0 / -mvPos.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float dist = length(uv);
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
          
          // Glow core
          float glow = exp(-dist * 8.0) * 0.5;
          vec3 finalColor = vColor + vec3(glow * 0.3);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    material.uniforms.time.value = time;
    material.uniforms.mouseX.value += (mouse.x - material.uniforms.mouseX.value) * 0.05;
    material.uniforms.mouseY.value += (mouse.y - material.uniforms.mouseY.value) * 0.05;

    // Update positions for drift
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArr[i * 3] += velocities[i * 3];
      posArr[i * 3 + 1] += velocities[i * 3 + 1];
      posArr[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around boundaries
      if (posArr[i * 3] > 10) posArr[i * 3] = -10;
      if (posArr[i * 3] < -10) posArr[i * 3] = 10;
      if (posArr[i * 3 + 1] > 5) posArr[i * 3 + 1] = -5;
      if (posArr[i * 3 + 1] < -5) posArr[i * 3 + 1] = 5;
    }

    posAttr.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.015;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <points ref={meshRef} geometry={geometry} material={material} />
    </>
  );
}
