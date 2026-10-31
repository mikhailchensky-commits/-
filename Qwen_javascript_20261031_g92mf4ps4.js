import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ProceduralTank({ type, isWireframe }) {
  const group = useRef()
  
  // Сбрасываем масштаб до 0 при смене типа танка для плавной анимации появления
  useEffect(() => {
    if (group.current) {
      group.current.scale.set(0, 0, 0)
    }
  }, [type])

  // Плавно увеличиваем масштаб до 1 для эффекта морфинга/перехода
  useFrame((state, delta) => {
    if (group.current) {
      group.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 4)
      // Легкая анимация парения в режиме ожидания
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  const materialProps = {
    wireframe: isWireframe,
    emissive: isWireframe ? "#06b6d4" : "#000000",
    emissiveIntensity: isWireframe ? 0.8 : 0,
    roughness: 0.7,
    metalness: 0.8
  }

  if (type === 'wwi') {
    return (
      <group ref={group}>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[2, 1.2, 3.5]} />
          <meshStandardMaterial color="#5c5c5c" {...materialProps} />
        </mesh>
        <mesh position={[-1.1, 0.6, 0]}>
          <boxGeometry args={[0.6, 1.2, 3.8]} />
          <meshStandardMaterial color="#3d3d3d" {...materialProps} />
        </mesh>
        <mesh position={[1.1, 0.6, 0]}>
          <boxGeometry args={[0.6, 1.2, 3.8]} />
          <meshStandardMaterial color="#3d3d3d" {...materialProps} />
        </mesh>
        <mesh position={[0, 1.3, 0.5]}>
          <boxGeometry args={[1.2, 0.6, 1.5]} />
          <meshStandardMaterial color="#4a4a4a" {...materialProps} />
        </mesh>
        <mesh position={[0, 1.3, 1.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.2, 8]} />
          <meshStandardMaterial color="#2a2a2a" {...materialProps} />
        </mesh>
      </group>
    )
  }

  if (type === 'wwii') {
    return (
      <group ref={group}>
        <mesh position={[0, 0.5, 0]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[2.2, 1, 4]} />
          <meshStandardMaterial color="#4b5320" {...materialProps} />
        </mesh>
        <mesh position={[-1.2, 0.4, 0]}>
          <boxGeometry args={[0.5, 0.8, 4.2]} />
          <meshStandardMaterial color="#2b2b2b" {...materialProps} />
        </mesh>
        <mesh position={[1.2, 0.4, 0]}>
          <boxGeometry args={[0.5, 0.8, 4.2]} />
          <meshStandardMaterial color="#2b2b2b" {...materialProps} />
        </mesh>
        <mesh position={[0, 1.3, -0.2]}>
          <cylinderGeometry args={[0.9, 1.1, 0.8, 8]} />
          <meshStandardMaterial color="#3d421b" {...materialProps} />
        </mesh>
        <mesh position={[0, 1.3, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 2.5, 8]} />
          <meshStandardMaterial color="#2a2a2a" {...materialProps} />
        </mesh>
      </group>
    )
  }

  if (type === 'coldwar') {
    return (
      <group ref={group}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[2.4, 0.8, 4.5]} />
          <meshStandardMaterial color="#d2b48c" {...materialProps} />
        </mesh>
        <mesh position={[-1.3, 0.3, 0]}>
          <boxGeometry args={[0.6, 0.6, 4.7]} />
          <meshStandardMaterial color="#3d3d3d" {...materialProps} />
        </mesh>
        <mesh position={[1.3, 0.3, 0]}>
          <boxGeometry args={[0.6, 0.6, 4.7]} />
          <meshStandardMaterial color="#3d3d3d" {...materialProps} />
        </mesh>
        <mesh position={[0, 1.1, -0.3]}>
          <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#c2a47c" {...materialProps} />
        </mesh>
        <mesh position={[0, 1.0, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
          <meshStandardMaterial color="#2a2a2a" {...materialProps} />
        </mesh>
      </group>
    )
  }

  if (type === 'modern') {
    return (
      <group ref={group}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2.6, 1, 5]} />
          <meshStandardMaterial color="#2f3a2f" {...materialProps} />
        </mesh>
        <mesh position={[0, 0.8, 2.6]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[2.4, 0.4, 0.5]} />
          <meshStandardMaterial color="#1a221a" {...materialProps} />
        </mesh>
        <mesh position={[-1.4, 0.3, 0]}>
          <boxGeometry args={[0.7, 0.6, 5.2]} />
          <meshStandardMaterial color="#1a1a1a" {...materialProps} />
        </mesh>
        <mesh position={[1.4, 0.3, 0]}>
          <boxGeometry args={[0.7, 0.6, 5.2]} />
          <meshStandardMaterial color="#1a1a1a" {...materialProps} />
        </mesh>
        <mesh position={[0, 1.4, -0.5]}>
          <boxGeometry args={[1.8, 0.7, 2.2]} />
          <meshStandardMaterial color="#253025" {...materialProps} />
        </mesh>
        <mesh position={[0, 1.6, 0.6]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[1.6, 0.4, 1]} />
          <meshStandardMaterial color="#253025" {...materialProps} />
        </mesh>
        <mesh position={[0, 1.4, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 3.5, 8]} />
          <meshStandardMaterial color="#1a1a1a" {...materialProps} />
        </mesh>
        <mesh position={[0.6, 1.8, 1.2]}>
          <boxGeometry args={[0.3, 0.2, 0.4]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={isWireframe ? 0 : 2} {...materialProps} />
        </mesh>
      </group>
    )
  }

  return null
}