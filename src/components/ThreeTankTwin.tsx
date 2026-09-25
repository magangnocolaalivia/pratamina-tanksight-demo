import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TankDevice } from '../types';
import { RotateCw, ZoomIn, ZoomOut, Layers, Eye, ShieldAlert, Sparkles, Thermometer } from 'lucide-react';

interface ThreeTankTwinProps {
  tank: TankDevice;
  height?: string;
}

export const ThreeTankTwin: React.FC<ThreeTankTwinProps> = ({ tank, height = '460px' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [cutawayMode, setCutawayMode] = useState<'cutaway' | 'transparent' | 'solid'>('cutaway');
  const [showThermalMap, setShowThermalMap] = useState(false);
  const [activeThermistorIndex, setActiveThermistorIndex] = useState<number | null>(null);

  // References to Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const tankGroupRef = useRef<THREE.Group | null>(null);
  const liquidMeshRef = useRef<THREE.Mesh | null>(null);
  const isDraggingRef = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const reqIdRef = useRef<number | null>(null);

  // Fuel color mapping
  const getFuelColor = (fuelType: string): number => {
    switch (fuelType) {
      case 'Pertamax Turbo':
        return 0xd90429; // Vivid Pertamina Ruby Red
      case 'Pertamax':
        return 0x0088cc; // Pertamina Blue/Teal
      case 'Pertalite':
        return 0x10b981; // Green
      case 'Biosolar B35':
        return 0xdf9b00; // Golden Amber Solar
      case 'Dexlite':
        return 0xf59e0b; // Amber
      case 'Pertamina Dex':
        return 0x059669; // Deep Emerald
      default:
        return 0x10b981;
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 460;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f19); // High contrast dark command center

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    cameraRef.current = camera;
    if (tank.category === 'bulk_terminal') {
      camera.position.set(0, 4.5, 12);
    } else {
      camera.position.set(0, 3.5, 9);
    }
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(8, 12, 10);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00a651, 0.4); // Pertamina green rim
    dirLight2.position.set(-8, 6, -6);
    scene.add(dirLight2);

    const rimLight = new THREE.DirectionalLight(0xed1c24, 0.5); // Pertamina red accent
    rimLight.position.set(0, -6, 5);
    scene.add(rimLight);

    // Ground Grid with Command Center styling
    const grid = new THREE.GridHelper(16, 16, 0xed1c24, 0x1e293b);
    grid.position.y = tank.category === 'bulk_terminal' ? -3.5 : -2.5;
    scene.add(grid);

    // Group for the Tank & contents
    const tankGroup = new THREE.Group();
    tankGroupRef.current = tankGroup;
    scene.add(tankGroup);

    // Build 3D Models
    const isTerminal = tank.category === 'bulk_terminal';
    const fillRatio = Math.min(Math.max(tank.metrics.grossVolumeLiters / tank.metrics.capacityLiters, 0.05), 0.95);
    const fuelColor = getFuelColor(tank.fuelType);

    if (isTerminal) {
      // VERTICAL CYLINDRICAL STORAGE TANK (Terminal BBM)
      const radius = 3.2;
      const height = 6.0;
      const tankPosY = 0;

      // 1. Tank Shell (White industrial tank with Pertamina red bands)
      const shellGeo = new THREE.CylinderGeometry(
        radius, 
        radius, 
        height, 
        48, 
        1, 
        cutawayMode === 'cutaway', 
        0, 
        cutawayMode === 'cutaway' ? Math.PI * 1.35 : Math.PI * 2
      );

      const shellMat = new THREE.MeshStandardMaterial({
        color: showThermalMap ? 0xef4444 : 0xf1f5f9,
        metalness: 0.35,
        roughness: 0.4,
        side: THREE.DoubleSide,
        transparent: cutawayMode === 'transparent',
        opacity: cutawayMode === 'transparent' ? 0.25 : 0.95,
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      shellMesh.position.y = tankPosY;
      tankGroup.add(shellMesh);

      // Red Pertamina corporate stripe around middle
      const stripeGeo = new THREE.CylinderGeometry(
        radius + 0.02, 
        radius + 0.02, 
        0.4, 
        48, 
        1, 
        cutawayMode === 'cutaway', 
        0, 
        cutawayMode === 'cutaway' ? Math.PI * 1.35 : Math.PI * 2
      );
      const stripeMat = new THREE.MeshStandardMaterial({
        color: 0xed1c24,
        metalness: 0.2,
        roughness: 0.5,
        side: THREE.DoubleSide
      });
      const stripeMesh = new THREE.Mesh(stripeGeo, stripeMat);
      stripeMesh.position.y = tankPosY + 1.2;
      tankGroup.add(stripeMesh);

      // Cone/Floating Roof
      const roofGeo = new THREE.ConeGeometry(radius + 0.15, 0.8, 48);
      const roofMat = new THREE.MeshStandardMaterial({
        color: showThermalMap ? 0xd90429 : 0xe2e8f0,
        metalness: 0.4,
        roughness: 0.4
      });
      const roofMesh = new THREE.Mesh(roofGeo, roofMat);
      roofMesh.position.y = tankPosY + height / 2 + 0.4;
      tankGroup.add(roofMesh);

      // Breather PV Valve on Roof
      const pvValveGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 16);
      const pvValveMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 });
      const pvValve = new THREE.Mesh(pvValveGeo, pvValveMat);
      pvValve.position.set(1.2, roofMesh.position.y + 0.4, 0.5);
      tankGroup.add(pvValve);

      // 2. Liquid Contents
      const liquidHeight = height * fillRatio;
      const liquidGeo = new THREE.CylinderGeometry(radius - 0.08, radius - 0.08, liquidHeight, 36);
      const liquidMat = new THREE.MeshStandardMaterial({
        color: fuelColor,
        roughness: 0.2,
        metalness: 0.15,
        transparent: true,
        opacity: 0.85
      });
      const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
      liquidMesh.position.y = tankPosY - height / 2 + liquidHeight / 2;
      liquidMeshRef.current = liquidMesh;
      tankGroup.add(liquidMesh);

      // Water bottom layer (if present)
      const waterRatio = Math.max(tank.metrics.waterLevelMm / 100, 0.02);
      const waterHeight = Math.min(waterRatio * 0.4, 0.4);
      const waterGeo = new THREE.CylinderGeometry(radius - 0.07, radius - 0.07, waterHeight, 36);
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.9
      });
      const waterMesh = new THREE.Mesh(waterGeo, waterMat);
      waterMesh.position.y = tankPosY - height / 2 + waterHeight / 2;
      tankGroup.add(waterMesh);

      // 3. Central ATG Magnetostrictive Probe Rod
      const probeGeo = new THREE.CylinderGeometry(0.04, 0.04, height + 0.8, 16);
      const probeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 });
      const probe = new THREE.Mesh(probeGeo, probeMat);
      probe.position.set(0.6, tankPosY + 0.4, 0);
      tankGroup.add(probe);

      // Multi-point Thermistor sensor nodes on probe
      tank.metrics.thermistors.forEach((t, i) => {
        const nodeY = tankPosY - height / 2 + (i + 0.8) * (height / 4.5);
        const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const nodeColor = t.temp > 35 ? 0xef4444 : t.temp > 30 ? 0xf59e0b : 0x10b981;
        const nodeMat = new THREE.MeshStandardMaterial({
          color: nodeColor,
          emissive: nodeColor,
          emissiveIntensity: 0.6
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.set(0.6, nodeY, 0);
        tankGroup.add(nodeMesh);
      });

      // Liquid Surface Float
      const floatGeo = new THREE.TorusGeometry(0.25, 0.08, 12, 24);
      const floatMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.5 });
      const floatMesh = new THREE.Mesh(floatGeo, floatMat);
      floatMesh.rotation.x = Math.PI / 2;
      floatMesh.position.set(0.6, liquidMesh.position.y + liquidHeight / 2, 0);
      tankGroup.add(floatMesh);

    } else {
      // HORIZONTAL UNDERGROUND STORAGE TANK (Tangki Pendam SPBU)
      const tankRadius = 1.6;
      const tankLength = 5.2;
      const tankPosY = 0;

      // Outer Shell (Double-wall FRP / Steel)
      const shellGeo = new THREE.CylinderGeometry(
        tankRadius, 
        tankRadius, 
        tankLength, 
        36, 
        1, 
        cutawayMode === 'cutaway', 
        0, 
        cutawayMode === 'cutaway' ? Math.PI * 1.35 : Math.PI * 2
      );
      shellGeo.rotateZ(Math.PI / 2);

      const shellMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.5,
        roughness: 0.4,
        side: THREE.DoubleSide,
        transparent: cutawayMode === 'transparent',
        opacity: cutawayMode === 'transparent' ? 0.25 : 0.95
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      shellMesh.position.y = tankPosY;
      tankGroup.add(shellMesh);

      // Dish ends (caps)
      const capGeo = new THREE.SphereGeometry(tankRadius, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2);
      const cap1 = new THREE.Mesh(capGeo, shellMat);
      cap1.position.set(tankLength / 2, tankPosY, 0);
      cap1.rotation.z = -Math.PI / 2;
      tankGroup.add(cap1);

      const cap2 = new THREE.Mesh(capGeo, shellMat);
      cap2.position.set(-tankLength / 2, tankPosY, 0);
      cap2.rotation.z = Math.PI / 2;
      tankGroup.add(cap2);

      // Liquid in horizontal cylinder
      const liquidRadius = tankRadius * 0.96;
      const liquidHeight = tankLength * 0.98;
      const liquidFillGeo = new THREE.CylinderGeometry(
        liquidRadius * fillRatio, 
        liquidRadius * fillRatio, 
        liquidHeight, 
        24
      );
      liquidFillGeo.rotateZ(Math.PI / 2);
      const liquidMat = new THREE.MeshStandardMaterial({
        color: fuelColor,
        roughness: 0.2,
        metalness: 0.15,
        transparent: true,
        opacity: 0.88
      });
      const liquidMesh = new THREE.Mesh(liquidFillGeo, liquidMat);
      liquidMesh.position.set(0, tankPosY - tankRadius * (1 - fillRatio * 1.1), 0);
      liquidMeshRef.current = liquidMesh;
      tankGroup.add(liquidMesh);

      // Manhole Riser & Containment Sump
      const riserGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.4, 24);
      const riserMat = new THREE.MeshStandardMaterial({ color: 0xed1c24, metalness: 0.3 });
      const riser = new THREE.Mesh(riserGeo, riserMat);
      riser.position.set(0, tankPosY + tankRadius + 0.7, 0);
      tankGroup.add(riser);

      // Vertical ATG Probe entering from manhole
      const probeGeo = new THREE.CylinderGeometry(0.04, 0.04, tankRadius * 2 + 1.2, 16);
      const probeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 });
      const probe = new THREE.Mesh(probeGeo, probeMat);
      probe.position.set(0, tankPosY + 0.4, 0);
      tankGroup.add(probe);

      // Water Bottom cut
      const waterGeo = new THREE.BoxGeometry(tankLength * 0.9, 0.12, liquidRadius * 1.2);
      const waterMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9 });
      const waterMesh = new THREE.Mesh(waterGeo, waterMat);
      waterMesh.position.set(0, tankPosY - tankRadius + 0.06, 0);
      tankGroup.add(waterMesh);
    }

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow rotation if enabled and not dragging
      if (isRotating && !isDraggingRef.current && tankGroupRef.current) {
        tankGroupRef.current.rotation.y += 0.005;
      }

      // Subtle liquid surface breathing effect
      if (liquidMeshRef.current) {
        liquidMeshRef.current.scale.y = 1 + Math.sin(elapsedTime * 2.5) * 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse / Touch Drag to Rotate
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !tankGroupRef.current) return;
      const deltaX = e.clientX - prevMousePos.current.x;
      const deltaY = e.clientY - prevMousePos.current.y;

      tankGroupRef.current.rotation.y += deltaX * 0.008;
      tankGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.6, tankGroupRef.current.rotation.x + deltaY * 0.005));

      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Zoom on wheel
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const zoomFactor = e.deltaY * 0.005;
      cameraRef.current.position.z = Math.max(5, Math.min(22, cameraRef.current.position.z + zoomFactor));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, [tank, cutawayMode, showThermalMap, isRotating]);

  const resetCamera = () => {
    if (cameraRef.current && tankGroupRef.current) {
      if (tank.category === 'bulk_terminal') {
        cameraRef.current.position.set(0, 4.5, 12);
      } else {
        cameraRef.current.position.set(0, 3.5, 9);
      }
      cameraRef.current.lookAt(0, 0, 0);
      tankGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const fillPercent = ((tank.metrics.grossVolumeLiters / tank.metrics.capacityLiters) * 100).toFixed(1);

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-[#0A0F19] border border-slate-800 shadow-2xl flex flex-col" style={{ height }}>
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full flex-1 cursor-grab active:cursor-grabbing" />

      {/* Floating HUD: Top Header Info */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="bg-[#0B0F17]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-white tracking-wide uppercase">{tank.tankNumber}</span>
          </div>
          <span className="text-slate-600">·</span>
          <span className="text-xs font-medium text-slate-300">{tank.fuelType}</span>
          <span className="text-slate-600">·</span>
          <span className="text-xs font-mono text-emerald-400 font-semibold">{fillPercent}% Terisi</span>
        </div>

        {/* Real-time ATG Probe Indicator */}
        <div className="bg-[#0B0F17]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2 pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#ED1C24]" />
          <span className="text-[11px] text-slate-300">ATG Mag-X Precision ±0.1mm</span>
        </div>
      </div>

      {/* Floating HUD: Bottom Layer Indicators (Level, Water Cut, Temp) */}
      <div className="absolute bottom-16 left-4 bg-[#0B0F17]/90 backdrop-blur-md p-2.5 rounded-lg border border-slate-800 text-xs pointer-events-auto space-y-1.5 max-w-[260px]">
        <div className="flex justify-between items-center text-slate-400">
          <span>Ketinggian Produk:</span>
          <span className="font-mono text-slate-100 font-bold tabular-nums">{tank.metrics.productLevelMm.toLocaleString()} mm</span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Air Dasar (Water Cut):</span>
          <span className={`font-mono font-bold tabular-nums ${tank.metrics.waterLevelMm > 25 ? 'text-red-400 animate-pulse' : 'text-sky-400'}`}>
            {tank.metrics.waterLevelMm} mm {tank.metrics.waterLevelMm > 25 ? '(ALARM)' : '(Aman)'}
          </span>
        </div>
        <div className="flex justify-between items-center text-slate-400">
          <span>Suhu Rata-rata:</span>
          <span className="font-mono text-amber-400 font-bold tabular-nums">{tank.metrics.avgTemperatureC}°C</span>
        </div>
      </div>

      {/* Interactive Controls Bar at Bottom */}
      <div className="relative px-4 py-2 bg-[#0E1524] border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 z-10">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 font-medium ${
              isRotating ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? 'Rotasi Aktif' : 'Rotasi Diam'}</span>
          </button>

          <button
            onClick={() => setCutawayMode(cutawayMode === 'cutaway' ? 'transparent' : cutawayMode === 'transparent' ? 'solid' : 'cutaway')}
            className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Mode: {cutawayMode === 'cutaway' ? 'Potongan 50%' : cutawayMode === 'transparent' ? 'Transparan' : 'Dinding Solid'}</span>
          </button>

          <button
            onClick={() => setShowThermalMap(!showThermalMap)}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
              showThermalMap ? 'bg-red-950/80 text-red-400 border border-red-800' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>Gradien Panas Matahari</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetCamera}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset Sudut Pandang"
          >
            Reset Kamera
          </button>
        </div>
      </div>
    </div>
  );
};
