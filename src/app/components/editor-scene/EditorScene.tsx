"use client";
import { Environment, Grid, OrbitControls, PerspectiveCamera, TransformControls } from '@react-three/drei';
import styles from './EditorScene.module.scss';
import { Canvas } from "@react-three/fiber"
import { Suspense } from 'react';
import Sztacheta from '@/app/3d-models/przeslo/Sztacheta';
const EditorScene = () => {


    return (
        <div className={styles.container}>
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} castShadow shadow-mapSize={1024} />
                <Suspense fallback={null}>
                    <Sztacheta width={2} height={5} thickness={0.2} position={[0, 0, 0]} boardStyle={'flat'} color={''} materialType={'wood'} />
                    <Environment preset="park" />
                </Suspense>
                <OrbitControls makeDefault />
            </Canvas>
        </div>
    )
}

export default EditorScene;