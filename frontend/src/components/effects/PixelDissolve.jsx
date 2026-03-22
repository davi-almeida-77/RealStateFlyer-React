import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float     uProgress;
  uniform vec2      uResolution;
  varying vec2      vUv;

  void main() {
    float blockSize = mix(1.0, 60.0, uProgress);
    vec2  pixelUV   = floor(vUv * uResolution / blockSize) * blockSize / uResolution;
    vec4  color     = texture2D(uTexture, pixelUV);
    float alpha     = 1.0 - smoothstep(0.6, 1.0, uProgress);
    gl_FragColor    = vec4(color.rgb, color.a * alpha);
  }
`

function PixelMesh({ imageUrl, progress }) {
  const meshRef  = useRef()
  const texture  = useTexture(imageUrl)
  const { size } = useThree()

  const uniforms = useMemo(() => ({
    uTexture:    { value: texture },
    uProgress:   { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [texture, size])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uProgress.value = progress.current
    }
  })

  const aspect = size.width / size.height
  const planeW = aspect > 1 ? 2 * aspect : 2
  const planeH = aspect > 1 ? 2 : 2 / aspect

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[planeW, planeH, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

export default function PixelDissolve({ imageUrl, progress, className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: 'transparent' }}
      >
        <PixelMesh imageUrl={imageUrl} progress={progress} />
      </Canvas>
    </div>
  )
}
