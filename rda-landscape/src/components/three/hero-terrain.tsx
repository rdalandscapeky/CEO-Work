"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Slow-drifting wireframe terrain behind the hero copy. Two layered planes
 * (forest + sage) undulate on offset sine waves so it reads as rolling
 * hills, not a tech-demo grid. Bails out entirely on prefers-reduced-motion.
 */
export function HeroTerrain() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    scene.fog = new THREE.Fog(0x10140f, 4, 11);

    function makeTerrain(color: number, opacity: number, y: number, segments = 48) {
      const geometry = new THREE.PlaneGeometry(16, 10, segments, segments);
      geometry.rotateX(-Math.PI / 2.35);
      const material = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = y;
      scene.add(mesh);
      return mesh;
    }

    const forestLayer = makeTerrain(0x2f5940, 0.35, -0.6);
    const sageLayer = makeTerrain(0x6b8e4e, 0.18, -1.1);

    const basePositions: Float32Array[] = [forestLayer, sageLayer].map(
      (mesh) =>
        new Float32Array(
          (mesh.geometry.attributes.position.array as Float32Array),
        ),
    );

    let frameId = 0;
    const start = performance.now();

    function animateFrame(mesh: THREE.Mesh, base: Float32Array, t: number, amp: number, freq: number) {
      const positions = mesh.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = base[i];
        const z = base[i + 2];
        positions[i + 1] =
          Math.sin(x * freq + t) * amp + Math.cos(z * freq * 0.8 + t * 0.7) * amp * 0.6;
      }
      mesh.geometry.attributes.position.needsUpdate = true;
    }

    function render(now: number) {
      const t = (now - start) / 1000;
      animateFrame(forestLayer, basePositions[0], t * 0.35, 0.28, 0.35);
      animateFrame(sageLayer, basePositions[1], t * 0.28 + 10, 0.22, 0.3);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    }

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      frameId = requestAnimationFrame(render);
    }

    function handleResize() {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      if (prefersReducedMotion) renderer.render(scene, camera);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
      [forestLayer, sageLayer].forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black,transparent)]"
    />
  );
}
