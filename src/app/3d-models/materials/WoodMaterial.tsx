import React from 'react';
import * as THREE from 'three';

interface WoodMaterialProps {
    color: string;
    roughness?: number;
    woodType?: string;
}

const WoodMaterial: React.FC<WoodMaterialProps> = ({ color, roughness = 0.8, woodType = "pine" }) => {
    const woodColor = new THREE.Color(color);
    return <meshStandardMaterial color={woodColor} roughness={roughness} metalness={0.1} />;
}

export default WoodMaterial;
