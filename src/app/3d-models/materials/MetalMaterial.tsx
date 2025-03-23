import React from 'react';
import * as THREE from 'three';

interface MetalMaterialProps {
    color: string;
    roughness?: number;
}

const MetalMaterial: React.FC<MetalMaterialProps> = ({ color, roughness = 0.3 }) => {
    const metalColor = new THREE.Color(color);

    return <meshStandardMaterial color={metalColor} roughness={roughness} metalness={0.8} />;
}

export default MetalMaterial;
