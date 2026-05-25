import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const bgVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const bgFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uAspect;
  uniform float uPlaneAspect;
  uniform float uImageAspect;
  varying vec2 vUv;
  
  // Simple 2D noise for a subtle breathing/heat-haze effect
  float random (in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  float noise (in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    // 1. "object-fit: cover" logic for WebGL
    float ratioX = min(uPlaneAspect / uImageAspect, 1.0);
    float ratioY = min(uImageAspect / uPlaneAspect, 1.0);
    
    vec2 uv = vec2(
      vUv.x * ratioX + (1.0 - ratioX) * 0.5,
      vUv.y * ratioY + (1.0 - ratioY) * 0.5
    );
    
    // Map mouse from [-1, 1] to [0, 1]
    vec2 mouseUV = uMouse * 0.5 + 0.5;
    
    // 2. Parallax Shift: The entire image moves slightly opposite to the mouse
    vec2 parallax = (mouseUV - 0.5) * 0.02;
    uv += parallax;
    
    // 3. Subtle Breathing / Heat Haze distortion
    float n = noise(uv * 4.0 + uTime * 0.1);
    uv += vec2(n * 0.008);
    
    // 4. Sample the background image
    vec4 texColor = texture2D(uTexture, uv);
    
    // 5. Mouse Spotlight / Aurora Glow
    vec2 aspectCorrectedUV = vec2(vUv.x * uAspect, vUv.y);
    vec2 aspectCorrectedMouse = vec2(mouseUV.x * uAspect, mouseUV.y);
    float dist = distance(aspectCorrectedUV, aspectCorrectedMouse);
    
    // Extremely soft, massive glow (Neon Green #C1FF72)
    float glow = smoothstep(1.0, 0.0, dist); 
    vec3 glowColor = vec3(0.75, 1.0, 0.45) * glow * 0.35; 
    
    // Mix the original image (darkened for text readability) with the glow
    vec3 finalColor = texColor.rgb * 0.35 + glowColor;
    
    // 6. Cinematic Chromatic Aberration near the edges of the screen
    float edgeDist = distance(vUv, vec2(0.5));
    float chromAb = smoothstep(0.4, 0.8, edgeDist) * 0.008;
    
    float r = texture2D(uTexture, uv + vec2(chromAb, 0.0)).r * 0.35;
    float b = texture2D(uTexture, uv - vec2(chromAb, 0.0)).b * 0.35;
    
    // Blend the RGB split back in
    finalColor.r = mix(finalColor.r, r + glowColor.r, 0.8);
    finalColor.b = mix(finalColor.b, b + glowColor.b, 0.8);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function AbstractGeometry() {
  const bgMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, camera, viewport } = useThree();

  const texture = useTexture('/bg.png');
  const imageAspect = texture.image ? (texture.image as HTMLImageElement).width / (texture.image as HTMLImageElement).height : 1.0;

  const bgZ = -10;
  const bgViewport = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, bgZ));

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (bgMaterialRef.current) {
      bgMaterialRef.current.uniforms.uTime.value = t;
      
      // Extremely smooth, buttery mouse interpolation
      bgMaterialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(bgMaterialRef.current.uniforms.uMouse.value.x, pointer.x, 0.05);
      bgMaterialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(bgMaterialRef.current.uniforms.uMouse.value.y, pointer.y, 0.05);
      
      bgMaterialRef.current.uniforms.uAspect.value = size.width / size.height;
      bgMaterialRef.current.uniforms.uPlaneAspect.value = bgViewport.width / bgViewport.height;
      bgMaterialRef.current.uniforms.uImageAspect.value = imageAspect;
    }
  });

  return (
    <mesh position={[0, 0, bgZ]} scale={[bgViewport.width, bgViewport.height, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={bgMaterialRef}
        vertexShader={bgVertexShader}
        fragmentShader={bgFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uAspect: { value: 1.0 },
          uPlaneAspect: { value: 1.0 },
          uImageAspect: { value: 1.0 }
        }}
      />
    </mesh>
  );
}
