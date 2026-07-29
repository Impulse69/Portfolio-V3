'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScroll, useMotionValueEvent } from 'framer-motion';

interface HeroScene3DProps {
  onProgress?: (progress: number) => void;
}

export default function HeroScene3D({ onProgress }: HeroScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    onProgress?.(50);

    // ── SCENE SETUP ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080d, 0.04);

    // ── CAMERA ──
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // ── STUDIO LIGHTING (Refined Neutral Tones) ──
    const ambientLight = new THREE.AmbientLight(0x2a2a35, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xe0e0e0, 2.5);
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x707080, 1.5);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    // ── 3D OBJECT GROUP ──
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Torus Knot Core (Clean Dark Metallic Material)
    const knotGeo = new THREE.TorusKnotGeometry(1.8, 0.55, 128, 32, 2, 3);
    const knotMatSolid = new THREE.MeshStandardMaterial({
      color: 0x14141d,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
    });
    const knotSolid = new THREE.Mesh(knotGeo, knotMatSolid);
    mainGroup.add(knotSolid);

    const knotMatWire = new THREE.MeshBasicMaterial({
      color: 0x8a8a9a,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const knotWire = new THREE.Mesh(knotGeo, knotMatWire);
    knotWire.scale.set(1.01, 1.01, 1.01);
    mainGroup.add(knotWire);

    // Inner Core
    const coreGeo = new THREE.IcosahedronGeometry(0.9, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a38,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Orbital Rings
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x5a5a6a,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.02, 16, 100), ringMat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.8, 0.02, 16, 100), ringMat);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    // Minimal Subtle Particle Dust
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const r = 4 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x606070,
      transparent: true,
      opacity: 0.5,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    onProgress?.(100);

    // Mouse & Scroll State
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };
    let scrollProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

      knotSolid.rotation.x = elapsedTime * 0.15;
      knotSolid.rotation.y = elapsedTime * 0.2;
      knotWire.rotation.x = elapsedTime * 0.15;
      knotWire.rotation.y = elapsedTime * 0.2;

      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.z = -elapsedTime * 0.2;

      particles.rotation.y = elapsedTime * 0.015;

      mainGroup.rotation.y = currentMouse.x * 0.25;
      mainGroup.rotation.x = -currentMouse.y * 0.25;

      const targetGroupX = (scrollProgress - 0.5) * 3.0;
      const targetGroupZ = -scrollProgress * 2.0;

      mainGroup.position.x += (targetGroupX - mainGroup.position.x) * 0.05;
      mainGroup.position.z += (targetGroupZ - mainGroup.position.z) * 0.05;

      camera.position.z = 8 + scrollProgress * 1.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    (canvas as unknown as { _updateScroll?: (val: number) => void })._updateScroll = (val: number) => {
      scrollProgress = val;
    };

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const canvas = canvasRef.current;
    if (canvas && (canvas as unknown as { _updateScroll?: (val: number) => void })._updateScroll) {
      (canvas as unknown as { _updateScroll: (val: number) => void })._updateScroll(latest);
    }
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#08080d]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block h-full w-full object-cover pointer-events-auto"
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>
    </div>
  );
}
