"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const GLOBE_RADIUS = 1.5;
const LAT_LINES = 10;   // horizontal rings
const LON_LINES = 12;   // vertical arcs
const SEGMENTS = 80;    // smoothness of each line

function buildGlobeGeometry(): THREE.BufferGeometry {
  const positions: number[] = [];

  // ─── Latitude lines (horizontal rings) ───
  for (let i = 0; i <= LAT_LINES; i++) {
    // From -80° to +80° (skip poles for clean terminal look)
    const lat = -80 + (i / LAT_LINES) * 160;
    const phi = (lat * Math.PI) / 180;
    const y = GLOBE_RADIUS * Math.sin(phi);
    const r = GLOBE_RADIUS * Math.cos(phi);

    for (let j = 0; j < SEGMENTS; j++) {
      const t1 = (j / SEGMENTS) * Math.PI * 2;
      const t2 = ((j + 1) / SEGMENTS) * Math.PI * 2;
      positions.push(r * Math.cos(t1), y, r * Math.sin(t1));
      positions.push(r * Math.cos(t2), y, r * Math.sin(t2));
    }
  }

  // ─── Longitude lines (vertical arcs) ───
  for (let i = 0; i < LON_LINES; i++) {
    const lon = (i / LON_LINES) * 360;
    const theta = (lon * Math.PI) / 180;

    for (let j = 0; j < SEGMENTS; j++) {
      const lat1 = -90 + (j / SEGMENTS) * 180;
      const lat2 = -90 + ((j + 1) / SEGMENTS) * 180;
      const phi1 = (lat1 * Math.PI) / 180;
      const phi2 = (lat2 * Math.PI) / 180;

      positions.push(
        GLOBE_RADIUS * Math.cos(phi1) * Math.cos(theta),
        GLOBE_RADIUS * Math.sin(phi1),
        GLOBE_RADIUS * Math.cos(phi1) * Math.sin(theta),
      );
      positions.push(
        GLOBE_RADIUS * Math.cos(phi2) * Math.cos(theta),
        GLOBE_RADIUS * Math.sin(phi2),
        GLOBE_RADIUS * Math.cos(phi2) * Math.sin(theta),
      );
    }
  }

  // ─── Equator highlight (slightly wider line effect via extra copies) ───
  for (let j = 0; j < SEGMENTS; j++) {
    const t1 = (j / SEGMENTS) * Math.PI * 2;
    const t2 = ((j + 1) / SEGMENTS) * Math.PI * 2;
    positions.push(GLOBE_RADIUS * Math.cos(t1), 0, GLOBE_RADIUS * Math.sin(t1));
    positions.push(GLOBE_RADIUS * Math.cos(t2), 0, GLOBE_RADIUS * Math.sin(t2));
  }

  // ─── Prime meridian highlight ───
  for (let j = 0; j < SEGMENTS; j++) {
    const lat1 = -90 + (j / SEGMENTS) * 180;
    const lat2 = -90 + ((j + 1) / SEGMENTS) * 180;
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    positions.push(GLOBE_RADIUS * Math.cos(phi1), GLOBE_RADIUS * Math.sin(phi1), 0);
    positions.push(GLOBE_RADIUS * Math.cos(phi2), GLOBE_RADIUS * Math.sin(phi2), 0);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geo;
}

function buildOrbitRings(): THREE.BufferGeometry {
  const positions: number[] = [];

  // Outer dashed orbit ring
  const r1 = GLOBE_RADIUS * 1.28;
  for (let j = 0; j < SEGMENTS; j++) {
    if (j % 4 === 3) continue; // gap for dashed effect
    const t1 = (j / SEGMENTS) * Math.PI * 2;
    const t2 = ((j + 1) / SEGMENTS) * Math.PI * 2;
    positions.push(r1 * Math.cos(t1), 0, r1 * Math.sin(t1));
    positions.push(r1 * Math.cos(t2), 0, r1 * Math.sin(t2));
  }

  // Tilted orbit arc
  const r2 = GLOBE_RADIUS * 1.18;
  for (let j = 0; j < SEGMENTS; j++) {
    const t1 = (j / SEGMENTS) * Math.PI * 2;
    const t2 = ((j + 1) / SEGMENTS) * Math.PI * 2;
    const y1 = r2 * Math.sin(t1) * Math.sin(Math.PI / 5);
    const y2 = r2 * Math.sin(t2) * Math.sin(Math.PI / 5);
    const xz1 = r2 * Math.cos(t1);
    const xz2 = r2 * Math.cos(t2);
    positions.push(xz1, y1, r2 * Math.sin(t1) * Math.cos(Math.PI / 5));
    positions.push(xz2, y2, r2 * Math.sin(t2) * Math.cos(Math.PI / 5));
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geo;
}

// Dot matrix on globe surface (scattered points like a terminal map)
function buildDotMatrix(): THREE.BufferGeometry {
  const positions: number[] = [];
  const dotCount = 60;
  for (let i = 0; i < dotCount; i++) {
    const lat = (Math.random() - 0.5) * 160;
    const lon = Math.random() * 360;
    const phi = (lat * Math.PI) / 180;
    const theta = (lon * Math.PI) / 180;
    const r = GLOBE_RADIUS + 0.008;
    positions.push(
      r * Math.cos(phi) * Math.cos(theta),
      r * Math.sin(phi),
      r * Math.cos(phi) * Math.sin(theta),
    );
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geo;
}

export default function WireframeOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const globeGeo = useMemo(() => buildGlobeGeometry(), []);
  const orbitGeo = useMemo(() => buildOrbitRings(), []);
  const dotGeo = useMemo(() => buildDotMatrix(), []);

  // Main accent line material
  const lineMat = useMemo(() =>
    new THREE.LineBasicMaterial({ color: "#7ef9ff", transparent: true, opacity: 0.28 }),
    []
  );
  // Equator/meridian highlight material
  const highlightMat = useMemo(() =>
    new THREE.LineBasicMaterial({ color: "#7ef9ff", transparent: true, opacity: 0.65 }),
    []
  );
  // Orbit ring material
  const orbitMat = useMemo(() =>
    new THREE.LineBasicMaterial({ color: "#a78bfa", transparent: true, opacity: 0.35 }),
    []
  );
  // Dot material
  const dotMat = useMemo(() =>
    new THREE.PointsMaterial({ color: "#7ef9ff", size: 0.025, transparent: true, opacity: 0.7 }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.14;
    groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.18;
    groupRef.current.position.y = Math.sin(t * 0.45) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[4, 4, 4]} intensity={0.6} color="#7ef9ff" />
      <pointLight position={[-4, -2, -4]} intensity={0.3} color="#a78bfa" />

      <group ref={groupRef}>
        {/* Main globe wireframe */}
        <lineSegments geometry={globeGeo} material={lineMat} />

        {/* Orbit rings around the globe */}
        <lineSegments geometry={orbitGeo} material={orbitMat} />

        {/* Surface dots */}
        <points geometry={dotGeo} material={dotMat} />

        {/* Small inner solid core for depth */}
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS * 0.04, 8, 8]} />
          <meshBasicMaterial color="#7ef9ff" transparent opacity={0.9} />
        </mesh>

        {/* Axis north pole marker */}
        <mesh position={[0, GLOBE_RADIUS + 0.05, 0]}>
          <sphereGeometry args={[0.028, 6, 6]} />
          <meshBasicMaterial color="#7ef9ff" transparent opacity={0.8} />
        </mesh>
        {/* Axis south pole marker */}
        <mesh position={[0, -(GLOBE_RADIUS + 0.05), 0]}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
        </mesh>
      </group>

      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.05} luminanceSmoothing={0.9} height={250} />
      </EffectComposer>
    </>
  );
}
