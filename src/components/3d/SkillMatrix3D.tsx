'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SKILL_NODES = [
  { name: 'React / Next.js', category: 'Frontend Architecture', level: '95%' },
  { name: 'Three.js / WebGL', category: '3D Graphics Engine', level: '85%' },
  { name: 'TypeScript', category: 'Type Safety & Logic', level: '90%' },
  { name: 'Node.js', category: 'Backend Runtimes', level: '82%' },
  { name: 'UI / UX Design', category: 'Interface Systems', level: '88%' },
  { name: 'Tailwind CSS', category: 'Styling Systems', level: '92%' },
  { name: 'Kotlin / Android', category: 'Mobile Engineering', level: '80%' },
  { name: 'Supabase / REST', category: 'Database & APIs', level: '84%' },
];

export default function SkillMatrix3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSkill, setActiveSkill] = useState<typeof SKILL_NODES[0] | null>(SKILL_NODES[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── 3D SCENE SETUP ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ── LIGHTING ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);

    // ── NODES GROUP ──
    const matrixGroup = new THREE.Group();
    scene.add(matrixGroup);

    const nodeMeshes: THREE.Mesh[] = [];
    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    const radius = 2.8;
    const nodeCount = SKILL_NODES.length;

    SKILL_NODES.forEach((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Clean Metallic Sphere Node
      const geo = new THREE.SphereGeometry(0.22, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x3a3a45,
        roughness: 0.2,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.userData = { skillIndex: i };

      // Outer Ring
      const ringGeo = new THREE.RingGeometry(0.28, 0.31, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x6a6a75,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      mesh.add(ringMesh);

      matrixGroup.add(mesh);
      nodeMeshes.push(mesh);

      // Connect lines
      nodeMeshes.forEach((otherMesh) => {
        if (mesh !== otherMesh && mesh.position.distanceTo(otherMesh.position) < 3.8) {
          linePositions.push(
            mesh.position.x, mesh.position.y, mesh.position.z,
            otherMesh.position.x, otherMesh.position.y, otherMesh.position.z
          );
        }
      });
    });

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4a4a55,
      transparent: true,
      opacity: 0.3,
    });
    const constellationLines = new THREE.LineSegments(lineGeo, lineMat);
    matrixGroup.add(constellationLines);

    // Raycasting & Drag
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        matrixGroup.rotation.y += deltaX * 0.008;
        matrixGroup.rotation.x += deltaY * 0.008;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(nodeMeshes);
        if (intersects.length > 0) {
          const index = intersects[0].object.userData.skillIndex;
          if (index !== undefined) {
            setActiveSkill(SKILL_NODES[index]);
            canvas.style.cursor = 'pointer';
          }
        } else {
          canvas.style.cursor = 'grab';
        }
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        matrixGroup.rotation.y += 0.002;
        matrixGroup.rotation.x += 0.001;
      }

      nodeMeshes.forEach((mesh) => {
        mesh.children[0]?.lookAt(camera.position);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] rounded-2xl bg-[#0f0f16] border border-white/10 flex flex-col justify-between p-6 overflow-hidden">
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a09a90]">
          Skill Constellation Matrix
        </span>
        <span className="text-[11px] text-[#7a756d] uppercase tracking-wider">Drag to Rotate</span>
      </div>

      <div className="relative flex-1 w-full h-full my-2">
        <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
      </div>

      {activeSkill && (
        <div className="relative z-10 p-3 rounded-xl bg-[#14141d] border border-white/10 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-white">{activeSkill.name}</h4>
            <p className="text-xs text-[#7a756d]">{activeSkill.category}</p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded bg-[#1f1f2a] text-[#d0cecb] border border-white/10">
            {activeSkill.level}
          </span>
        </div>
      )}
    </div>
  );
}
