'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Image from 'next/image';
import { RotateCw, Sparkles } from 'lucide-react';

interface TurntableViewerProps {
  modelType?: 'mug' | 'pan';
  primaryColor?: string;
  fallbackImage: string;
  title: string;
}

export const TurntableViewer: React.FC<TurntableViewerProps> = ({
  modelType = 'mug',
  primaryColor = '#B56339', // Terracotta default
  fallbackImage,
  title,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHasWebGL(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.4);

    // 2. Renderer with soft anti-aliasing
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    // 3. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf4e6d4, 1.2);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    // Warm Gold Rim Light (accentuating brand luxury)
    const goldRimLight = new THREE.DirectionalLight(0xceac6f, 2.0);
    goldRimLight.position.set(0, -2, -3);
    scene.add(goldRimLight);

    // 4. Procedural High-Detail 3D Models
    const group = new THREE.Group();

    if (modelType === 'mug') {
      // Ceramic Coffee Mug Body
      const mugMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(primaryColor),
        roughness: 0.35,
        metalness: 0.05,
        clearcoat: 0.6,
        clearcoatRoughness: 0.15,
      });

      // Mug cylinder with organic slight flare
      const mugGeo = new THREE.CylinderGeometry(0.55, 0.48, 1.1, 48, 1, false);
      const mugMesh = new THREE.Mesh(mugGeo, mugMaterial);
      group.add(mugMesh);

      // Mug hollow interior (cream glazed)
      const interiorMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#ECE9E3'),
        roughness: 0.2,
        clearcoat: 0.8,
      });
      const interiorGeo = new THREE.CylinderGeometry(0.48, 0.42, 1.05, 32);
      const interiorMesh = new THREE.Mesh(interiorGeo, interiorMat);
      interiorMesh.position.y = 0.05;
      group.add(interiorMesh);

      // Mug Handle (smooth Torus)
      const handleMat = mugMaterial;
      const handleGeo = new THREE.TorusGeometry(0.35, 0.08, 24, 48, Math.PI * 1.2);
      const handleMesh = new THREE.Mesh(handleGeo, handleMat);
      handleMesh.rotation.z = -Math.PI / 1.7;
      handleMesh.position.set(0.55, 0.0, 0);
      group.add(handleMesh);

      // Ceramic Base Saucer
      const saucerGeo = new THREE.CylinderGeometry(0.85, 0.75, 0.08, 48);
      const saucerMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#ECE9E3'),
        roughness: 0.4,
        clearcoat: 0.4,
      });
      const saucerMesh = new THREE.Mesh(saucerGeo, saucerMat);
      saucerMesh.position.y = -0.58;
      group.add(saucerMesh);
    } else {
      // Enameled Cast-Iron Dutch Oven Pan
      const panMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(primaryColor),
        roughness: 0.3,
        metalness: 0.1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      });

      // Pan base pot
      const panGeo = new THREE.CylinderGeometry(0.85, 0.75, 0.7, 48);
      const panMesh = new THREE.Mesh(panGeo, panMaterial);
      panMesh.position.y = -0.2;
      group.add(panMesh);

      // Pan Lid (curved dome)
      const lidGeo = new THREE.SphereGeometry(0.86, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35);
      const lidMesh = new THREE.Mesh(lidGeo, panMaterial);
      lidMesh.position.y = 0.15;
      group.add(lidMesh);

      // Gold Knob on Lid
      const knobMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#CEAC6F'),
        metalness: 0.85,
        roughness: 0.25,
      });
      const knobGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.15, 32);
      const knobMesh = new THREE.Mesh(knobGeo, knobMat);
      knobMesh.position.y = 0.52;
      group.add(knobMesh);

      // Side Handles
      const sideHandleGeo = new THREE.TorusGeometry(0.2, 0.06, 16, 32, Math.PI);
      const handle1 = new THREE.Mesh(sideHandleGeo, panMaterial);
      handle1.position.set(0.9, -0.05, 0);
      handle1.rotation.y = Math.PI / 2;
      group.add(handle1);

      const handle2 = new THREE.Mesh(sideHandleGeo, panMaterial);
      handle2.position.set(-0.9, -0.05, 0);
      handle2.rotation.y = -Math.PI / 2;
      group.add(handle2);
    }

    scene.add(group);
    camera.lookAt(0, 0, 0);
    setIsLoading(false);

    // 5. Interaction: Mouse/Touch Orbit Damping
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      rotationVelocityY = deltaX * 0.005;
      rotationVelocityX = deltaY * 0.005;

      group.rotation.y += rotationVelocityY;
      group.rotation.x = Math.max(-0.4, Math.min(0.6, group.rotation.x + rotationVelocityX));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;

      rotationVelocityY = deltaX * 0.006;
      rotationVelocityX = deltaY * 0.006;

      group.rotation.y += rotationVelocityY;
      group.rotation.x = Math.max(-0.4, Math.min(0.6, group.rotation.x + rotationVelocityX));

      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 6. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Continuous gentle auto-spin when idle
      if (!isDragging) {
        group.rotation.y += 0.006;
        // Damping velocity
        rotationVelocityX *= 0.92;
        rotationVelocityY *= 0.92;
        group.rotation.y += rotationVelocityY;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
      if (domEl.parentNode) {
        domEl.parentNode.removeChild(domEl);
      }
    };
  }, [modelType, primaryColor]);

  if (!hasWebGL) {
    return (
      <div className="relative w-full h-full aspect-square bg-paper-light rounded-2xl overflow-hidden">
        <Image
          src={fallbackImage}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] bg-gradient-to-b from-cream-100 to-paper rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-charcoal/5 group shadow-soft-sm">
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating 3D Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-charcoal/10 text-xs font-semibold text-charcoal shadow-soft-sm pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-gold" />
        <span>Visualização 3D 360°</span>
      </div>

      {/* Interaction Hint */}
      <div className={`absolute bottom-4 inset-x-0 flex justify-center transition-opacity duration-300 pointer-events-none ${isInteracting ? 'opacity-0' : 'opacity-85'}`}>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal/80 text-white text-xs font-medium backdrop-blur-sm shadow-soft-md">
          <RotateCw className="w-3.5 h-3.5 text-gold-light animate-spin" style={{ animationDuration: '8s' }} />
          <span>Arraste para girar a peça em 360°</span>
        </div>
      </div>
    </div>
  );
};
