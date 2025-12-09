import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

export function RaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<THREE.Points | null>(null);
  const orbRef = useRef<THREE.Mesh | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x00ffff),
      new THREE.Color(0xff00ff),
      new THREE.Color(0x8000ff),
      new THREE.Color(0x0080ff),
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    const orbGeometry = new THREE.IcosahedronGeometry(4, 2);
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: 0x8000ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.set(15, 5, -10);
    scene.add(orb);
    orbRef.current = orb;

    const innerOrbGeometry = new THREE.IcosahedronGeometry(3, 1);
    const innerOrbMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerOrb = new THREE.Mesh(innerOrbGeometry, innerOrbMaterial);
    orb.add(innerOrb);

    const coreGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.3,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    orb.add(core);

    const ringGeometry = new THREE.TorusGeometry(6, 0.1, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    orb.add(ring);

    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      if (particlesRef.current) {
        particlesRef.current.rotation.y = mouseX * 0.2;
        particlesRef.current.rotation.x = mouseY * 0.2;
      }

      if (orbRef.current) {
        orbRef.current.position.x = 15 + mouseX * 3;
        orbRef.current.position.y = 5 + mouseY * 3;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      timeRef.current += 0.01;

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;

        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(timeRef.current + positions[i] * 0.1) * 0.02;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      if (orbRef.current) {
        orbRef.current.rotation.x += 0.005;
        orbRef.current.rotation.y += 0.008;
        orbRef.current.rotation.z += 0.003;

        orbRef.current.position.y = 5 + Math.sin(timeRef.current * 0.5) * 2;

        const scale = 1 + Math.sin(timeRef.current * 2) * 0.05;
        orbRef.current.scale.setScalar(scale);
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      data-testid="rave-background"
    />
  );
}
