import * as THREE from 'three';
import WoodMaterial from '../materials/WoodMaterial';
import MetalMaterial from '../materials/MetalMaterial';

interface RamaPrzeslaProps {
    width: number;
    height: number;
    thickness: number;
    color: string;
    materialType: 'wood' | 'metal';
    displayTopFramePart: boolean;
}

const RamaPrzesla: React.FC<RamaPrzeslaProps> = ({ width, height, thickness, color, materialType, displayTopFramePart }) => {
    const frameThickness = thickness * 1.5;
    const frameMaterial =
        materialType === "wood" ? (
            <WoodMaterial color={color} roughness={0.7} />
        ) : (
            <MetalMaterial color={color} roughness={0.4} />
        )

    const createFramePart = (width: number, height: number, depth: number, posX: number, posY: number, posZ: number) => {
        return (
            <mesh position={[posX, posY, posZ]} castShadow receiveShadow>
                <boxGeometry args={[width, height, depth]} />
                {frameMaterial}
            </mesh>
        );
    };


    return (
        <group>
            {/* Rama pozioma - dolna */}
            {createFramePart(width, frameThickness, frameThickness, 0, -height / 2 + frameThickness / 2, 0)}

            {displayTopFramePart && createFramePart(width, frameThickness, frameThickness, 0, height / 2 - frameThickness / 2, 0)}

            {/* Rama pionowa - lewa */}
            {createFramePart(frameThickness, height, frameThickness, -width / 2 + frameThickness / 2, 0, 0)}

            {/* Rama pionowa - prawa */}
            {createFramePart(frameThickness, height, frameThickness, width / 2 - frameThickness / 2, 0, 0)}
        </group>
    );
};

export default RamaPrzesla;