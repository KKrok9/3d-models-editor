"use client";
import { Center, Environment, OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei';
import styles from './EditorScene.module.scss';
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from 'react';
import Przeslo from '@/app/3d-models/przeslo/Przeslo';
import SidePanel from '../side-panel/SidePanel';
import { FencePanelProps } from '@/app/props/FencePanelProps';
import * as THREE from "three";
import { GLTFExporter } from 'three/examples/jsm/Addons.js';

const EditorScene = () => {
    const sceneRef = useRef<THREE.Group>(null); // Ref for the scene
    const [fenceParams, setFenceParams] = useState<FencePanelProps>({
        width: 2,
        height: 2,
        boardCount: 8,
        boardStyle: "flat",
        frameStyle: "",
        boardThickness: 0.05,
        boardColor: "#8B4513",
        frameColor: "#000000",
        boardMaterial: "wood",
        frameMaterial: "wood",
        displayTopFramePart: false,
        ref: sceneRef
    });

    const exportGLB = () => {
        if (!sceneRef.current) return;

        const exporter = new GLTFExporter();
        exporter.parse(
            sceneRef.current,
            (gltf) => {
                const blob = new Blob([gltf as BlobPart], { type: "application/octet-stream" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "fence_panel.glb";
                link.click();
            },
            (error) => {
                console.error("An error happened during export:", error);
            },
            { binary: true }
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.left_side}>
                <Canvas shadows style={{ height: "100%", width: "100%" }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
                    <Sky />
                    <Environment preset="sunset" background />
                    <Center>
                        <Przeslo {...fenceParams} />
                    </Center>
                    <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} minDistance={2} maxDistance={10} />
                </Canvas>
            </div>
            <div className={styles.right_side}>
                <SidePanel exportGLB={exportGLB} fenceParams={fenceParams} setFenceParams={setFenceParams} />
            </div>
        </div>
    );
};

export default EditorScene;
