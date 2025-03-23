"use client";
import { Environment, Grid, OrbitControls, PerspectiveCamera, TransformControls } from '@react-three/drei';
import styles from './EditorScene.module.scss';
import { Canvas } from "@react-three/fiber"
import { Suspense } from 'react';
import Sztacheta from '@/app/3d-models/przeslo/Sztacheta';
import Przeslo from '@/app/3d-models/przeslo/Przeslo';
const EditorScene = () => {


    return (
        <div className={styles.container}>
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} castShadow shadow-mapSize={1024} />
                <Suspense fallback={null}>
                    <Przeslo width={2} height={2} boardCount={8} boardStyle={'flat'} frameStyle={''} boardThickness={0.05} boardColor={''} frameColor={''} boardMaterial={'wood'} frameMaterial={'wood'} hasTopDecoration={false}>
                    </Przeslo>
                    <Environment preset="park" />
                </Suspense>
                <OrbitControls makeDefault />
            </Canvas>
        </div>
    )
}

export default EditorScene;