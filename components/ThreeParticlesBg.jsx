'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Full-size canvas that renders a floating particle-network animation
 * using Three.js. Meant to be placed as the first child of a `relative`
 * section element—it fills the parent via `absolute inset-0`.
 */
export default function ThreeParticlesBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const getSize = () => ({
      w: parent.clientWidth || window.innerWidth,
      h: parent.clientHeight || window.innerHeight,
    });
    const { w: W, h: H } = getSize();

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // ── Scene & Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 1, 2000);
    camera.position.z = 520;

    // ── Particles ─────────────────────────────────────────────────────────
    const N = 85;
    const SPREAD = [720, 520, 420];

    const pts = Array.from({ length: N }, () => ({
      x: (Math.random() - 0.5) * SPREAD[0],
      y: (Math.random() - 0.5) * SPREAD[1],
      z: (Math.random() - 0.5) * SPREAD[2],
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      vz: (Math.random() - 0.5) * 0.16,
    }));

    const ptPosArr = new Float32Array(N * 3);
    pts.forEach((p, i) => {
      ptPosArr[i * 3] = p.x;
      ptPosArr[i * 3 + 1] = p.y;
      ptPosArr[i * 3 + 2] = p.z;
    });

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPosArr, 3));
    const ptMat = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 2.8,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(ptGeo, ptMat));

    // ── Lines (pre-allocated buffer) ──────────────────────────────────────
    const MAX_DIST = 165;
    const MAX_SEGS = Math.ceil((N * (N - 1)) / 2); // worst-case segment count

    const linePosArr = new Float32Array(MAX_SEGS * 6); // 2 pts × 3 coords each
    const linePosAttr = new THREE.BufferAttribute(linePosArr, 3);
    linePosAttr.setUsage(THREE.DynamicDrawUsage);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', linePosAttr);
    lineGeo.setDrawRange(0, 0);

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.18,
    });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    // ── Animation loop ────────────────────────────────────────────────────
    let animId;
    let tick = 0;
    const maxD2 = MAX_DIST * MAX_DIST;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      tick++;

      // Move each particle, bounce off bounds
      pts.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        if (Math.abs(p.x) > SPREAD[0] / 2) p.vx *= -1;
        if (Math.abs(p.y) > SPREAD[1] / 2) p.vy *= -1;
        if (Math.abs(p.z) > SPREAD[2] / 2) p.vz *= -1;
        ptPosArr[i * 3] = p.x;
        ptPosArr[i * 3 + 1] = p.y;
        ptPosArr[i * 3 + 2] = p.z;
      });
      ptGeo.attributes.position.needsUpdate = true;

      // Rebuild line buffer every 3 frames (performance optimisation)
      if (tick % 3 === 0) {
        let s = 0;
        for (let i = 0; i < N; i++) {
          for (let j = i + 1; j < N; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const dz = pts[i].z - pts[j].z;
            if (dx * dx + dy * dy + dz * dz < maxD2) {
              const b = s * 6;
              linePosArr[b] = pts[i].x;
              linePosArr[b + 1] = pts[i].y;
              linePosArr[b + 2] = pts[i].z;
              linePosArr[b + 3] = pts[j].x;
              linePosArr[b + 4] = pts[j].y;
              linePosArr[b + 5] = pts[j].z;
              s++;
            }
          }
        }
        lineGeo.setDrawRange(0, s * 2);
        linePosAttr.needsUpdate = true;
      }

      // Slow Y-axis rotation for a subtle 3-D parallax feel
      scene.rotation.y += 0.00035;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ────────────────────────────────────────────────────
    const onResize = () => {
      const { w, h } = getSize();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Clean-up ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      ptGeo.dispose();
      ptMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
