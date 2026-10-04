import { useEffect, useRef } from "react";

const MODEL_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260929_212926_92423081-b0e4-4f5a-b650-14af6c05c058.glb";

const vert = `varying vec3 vNormal; varying vec3 vEye;
void main(){ vec4 w = modelMatrix*vec4(position,1.0); vec4 mv = viewMatrix*w; gl_Position = projectionMatrix*mv;
vNormal = normalize(normalMatrix*normal); vEye = normalize(mv.xyz); }`;

const frag = `uniform sampler2D uTexture; uniform vec2 uResolution;
uniform float uIorR,uIorY,uIorG,uIorC,uIorB,uIorP,uRefractPower,uChromatic,uSaturation,uShininess,uDiffuseness,uFresnelPower,uBackside;
uniform vec3 uLight; varying vec3 vNormal; varying vec3 vEye;
float spec(vec3 n, vec3 eye, vec3 light, float sh, float df){ vec3 l = normalize(-light); vec3 h = normalize(-eye + l);
 return pow(max(dot(n,h),0.0), sh) + max(0.0, dot(n,l))*df; }
void main(){ vec2 uv = gl_FragCoord.xy / uResolution; vec3 n = normalize(vNormal); if(uBackside>0.5) n=-n; vec3 eye = normalize(vEye);
 vec3 color = vec3(0.0); const int LOOP = 16;
 for(int i=0;i<LOOP;i++){ float slide = float(i)/float(LOOP)*0.045;
  vec3 rR=refract(eye,n,1.0/uIorR), rY=refract(eye,n,1.0/uIorY), rG=refract(eye,n,1.0/uIorG), rC=refract(eye,n,1.0/uIorC), rB=refract(eye,n,1.0/uIorB), rP=refract(eye,n,1.0/uIorP);
  float r = texture2D(uTexture, uv + rR.xy*(uRefractPower+slide*1.0)*uChromatic).x*0.5;
  vec3 tY = texture2D(uTexture, uv + rY.xy*(uRefractPower+slide*1.0)*uChromatic).rgb; float y=(tY.x*2.0+tY.y*2.0-tY.z)/6.0;
  float g = texture2D(uTexture, uv + rG.xy*(uRefractPower+slide*2.0)*uChromatic).y*0.5;
  vec3 tC = texture2D(uTexture, uv + rC.xy*(uRefractPower+slide*2.5)*uChromatic).rgb; float c=(tC.y*2.0+tC.z*2.0-tC.x)/6.0;
  float b = texture2D(uTexture, uv + rB.xy*(uRefractPower+slide*3.0)*uChromatic).z*0.5;
  vec3 tP = texture2D(uTexture, uv + rP.xy*(uRefractPower+slide*1.0)*uChromatic).rgb; float p=(tP.z*2.0+tP.x*2.0-tP.y)/6.0;
  color += vec3(r+(2.0*p+2.0*y-c)/3.0, g+(2.0*y+2.0*c-p)/3.0, b+(2.0*c+2.0*p-y)/3.0); }
 color /= float(LOOP); float l = dot(color, vec3(0.2125,0.7154,0.0721)); color = mix(vec3(l), color, uSaturation);
 float s = spec(n,eye,uLight,uShininess,uDiffuseness) + 0.6*spec(n,eye,vec3(1.0,1.0,-1.0),uShininess*0.6,uDiffuseness*0.5);
 color += s*(uBackside>0.5?0.35:1.0);
 float f = pow(1.0+dot(eye,n), uFresnelPower); color = mix(color, vec3(1.0), f*(uBackside>0.5?0.25:0.55));
 color += vec3(0.004,0.005,0.007); gl_FragColor = vec4(color,1.0);
#include <colorspace_fragment>
}`;

/** Rotatable glass cube refracting a big headline drawn on a hidden 2D canvas. */
export function GlassCube({ lines = ["CLAU"], className = "" }: { lines?: string[]; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { mergeVertices, mergeGeometries } = await import("three/examples/jsm/utils/BufferGeometryUtils.js");
      const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js");
      const canvas = ref.current;
      if (!canvas || disposed) return;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      renderer.setClearColor(0x000000);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(0, 0, 10);
      const text = document.createElement("canvas");
      const tex = new THREE.CanvasTexture(text);
      tex.colorSpace = THREE.SRGBColorSpace; tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false;
      const bgScene = new THREE.Scene();
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
        uniforms: { uTex: { value: tex } }, depthTest: false, depthWrite: false,
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }`,
        fragmentShader: `uniform sampler2D uTex; varying vec2 vUv; void main(){ gl_FragColor = texture2D(uTex, vUv);\n#include <colorspace_fragment>\n}`,
      }));
      quad.frustumCulled = false; bgScene.add(quad);
      const rtOpts = { type: THREE.HalfFloatType };
      const rtBack = new THREE.WebGLRenderTarget(1, 1, rtOpts), rtFront = new THREE.WebGLRenderTarget(1, 1, rtOpts);
      const mk = (back: boolean) => new THREE.ShaderMaterial({
        vertexShader: vert, fragmentShader: frag, side: back ? THREE.BackSide : THREE.FrontSide,
        uniforms: {
          uTexture: { value: back ? rtBack.texture : rtFront.texture }, uResolution: { value: new THREE.Vector2() },
          uIorR: { value: 1.15 }, uIorY: { value: 1.16 }, uIorG: { value: 1.18 }, uIorC: { value: 1.22 }, uIorB: { value: 1.22 }, uIorP: { value: 1.22 },
          uRefractPower: { value: back ? 0.22 : 0.3 }, uChromatic: { value: 0.5 }, uSaturation: { value: 1.08 }, uShininess: { value: 90 },
          uDiffuseness: { value: 0.02 }, uFresnelPower: { value: 5 }, uLight: { value: new THREE.Vector3(-1, 1, 1) }, uBackside: { value: back ? 1 : 0 },
        },
      });
      const backMat = mk(true), frontMat = mk(false);
      const scene = new THREE.Scene(), pivot = new THREE.Group(), spinner = new THREE.Group();
      scene.add(pivot); pivot.add(spinner);
      spinner.rotation.set(-0.42, 0.62, 0.18);
      const cube = new THREE.Mesh(new RoundedBoxGeometry(1, 1, 1, 8, 0.12), frontMat);
      spinner.add(cube);
      let W = 1, H = 1;
      const drawText = () => {
        text.width = W * dpr; text.height = H * dpr;
        const c = text.getContext("2d")!; c.setTransform(dpr, 0, 0, dpr, 0, 0);
        c.fillStyle = "#000"; c.fillRect(0, 0, W, H);
        let fs = Math.min(H * 0.32, W * 0.3);
        c.font = `800 ${fs}px Poppins`;
        const maxW = Math.max(...lines.map((l) => c.measureText(l).width));
        if (maxW > W * 0.92) fs *= (W * 0.92) / maxW;
        c.font = `800 ${fs}px Poppins`; c.fillStyle = "#e9e9e9"; c.textAlign = "center"; c.textBaseline = "alphabetic";
        const gap = fs * 1.07, cap = fs * 0.7, mid = (lines.length - 1) / 2;
        lines.forEach((l, i) => c.fillText(l, W / 2, H / 2 + cap / 2 + (i - mid) * gap));
        tex.needsUpdate = true;
      };
      const layout = () => {
        W = canvas.clientWidth || 1; H = canvas.clientHeight || 1;
        renderer.setSize(W, H, false);
        camera.aspect = W / H; camera.updateProjectionMatrix();
        rtBack.setSize(W * dpr, H * dpr); rtFront.setSize(W * dpr, H * dpr);
        backMat.uniforms.uResolution.value.set(W * dpr, H * dpr); frontMat.uniforms.uResolution.value.set(W * dpr, H * dpr);
        drawText();
        const visH = 2 * Math.tan((15 * Math.PI) / 180) * 10;
        pivot.scale.setScalar((Math.min(H * 0.62, W * 0.5) / H) * visH);
      };
      new GLTFLoader().load(MODEL_URL, (gltf) => {
        const parts: THREE.BufferGeometry[] = [];
        gltf.scene.updateMatrixWorld(true);
        gltf.scene.traverse((o) => {
          const m = o as THREE.Mesh;
          if (!m.isMesh) return;
          let g = m.geometry.clone();
          ["uv", "color", "tangent"].forEach((a) => g.deleteAttribute(a));
          g = mergeVertices(g, 1e-4); g.computeVertexNormals(); g.applyMatrix4(m.matrixWorld); parts.push(g);
        });
        const g = parts.length > 1 ? mergeGeometries(parts) : parts[0];
        if (!g) return;
        g.computeBoundingBox(); const bb = g.boundingBox!, ctr = new THREE.Vector3(), sz = new THREE.Vector3();
        bb.getCenter(ctr); bb.getSize(sz); g.translate(-ctr.x, -ctr.y, -ctr.z); g.scale(1 / Math.max(sz.x, sz.y, sz.z), 1 / Math.max(sz.x, sz.y, sz.z), 1 / Math.max(sz.x, sz.y, sz.z));
        cube.geometry.dispose(); cube.geometry = g;
      }, undefined, () => {});
      // interaction
      const vel = { x: 0, y: 0 }; let dragging = false, lx = 0, ly = 0, lastT = 0, release = -10;
      const Y = new THREE.Vector3(0, 1, 0), X = new THREE.Vector3(1, 0, 0), q = new THREE.Quaternion();
      const rot = (dx: number, dy: number) => {
        spinner.quaternion.premultiply(q.setFromAxisAngle(Y, dx)); spinner.quaternion.premultiply(q.setFromAxisAngle(X, dy));
      };
      const down = (e: PointerEvent) => { dragging = true; lx = e.clientX; ly = e.clientY; lastT = performance.now(); canvas.setPointerCapture(e.pointerId); };
      const move = (e: PointerEvent) => {
        if (!dragging) return; const dx = (e.clientX - lx) * 0.008, dy = (e.clientY - ly) * 0.008; rot(dx, dy);
        const now = performance.now(), f = Math.max((now - lastT) / 16.67, 1); vel.x = dx / f; vel.y = dy / f; lastT = now; lx = e.clientX; ly = e.clientY;
      };
      const up = () => { if (dragging) { dragging = false; release = performance.now() / 1000; } };
      canvas.addEventListener("pointerdown", down); canvas.addEventListener("pointermove", move);
      canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up);
      const ro = new ResizeObserver(layout); ro.observe(canvas);
      await Promise.race([Promise.all([document.fonts.load("800 100px Poppins"), document.fonts.ready]), new Promise((r) => setTimeout(r, 2500))]);
      if (disposed) return;
      layout();
      let prev = performance.now(), raf = 0;
      const loop = (t: number) => {
        const dt = Math.min((t - prev) / 1000, 0.05); prev = t;
        if (!dragging) {
          rot(vel.x * dt * 60, vel.y * dt * 60); const d = Math.pow(0.94, dt * 60); vel.x *= d; vel.y *= d;
          const blend = Math.min(Math.max((t / 1000 - release - 0.6) / 1, 0), 1);
          rot(0.0035 * blend * dt * 60, 0.0012 * blend * dt * 60);
        }
        renderer.setRenderTarget(rtBack); renderer.autoClear = true; renderer.render(bgScene, camera);
        renderer.setRenderTarget(rtFront); renderer.render(bgScene, camera);
        renderer.autoClear = false; cube.material = backMat; renderer.render(scene, camera);
        renderer.setRenderTarget(null); renderer.autoClear = true; renderer.render(bgScene, camera);
        renderer.autoClear = false; renderer.clearDepth(); cube.material = frontMat; renderer.render(scene, camera);
        renderer.autoClear = true;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      cleanup = () => { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); rtBack.dispose(); rtFront.dispose(); };
    })();
    return () => { disposed = true; cleanup(); };
  }, [lines.join("|")]);
  return <canvas ref={ref} className={`block h-full w-full cursor-grab touch-none ${className}`} aria-label="Rotatable glass cube. Drag to rotate." />;
}
