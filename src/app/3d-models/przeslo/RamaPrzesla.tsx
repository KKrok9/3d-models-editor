import * as THREE from 'three';

interface RamaPrzeslaProps {
    width: number;
    height: number;
    thickness: number;
    color: string;
    materialType: 'wood' | 'metal';
    hasTopDecoration: boolean;
}

const RamaPrzesla: React.FC<RamaPrzeslaProps> = ({ width, height, thickness, color, materialType, hasTopDecoration }) => {
    const frameThickness = thickness * 1.5;


    const createFramePart = (width: number, height: number, depth: number, posX: number, posY: number, posZ: number) => {
        return (
            <mesh position={[posX, posY, posZ]} castShadow receiveShadow>
                <boxGeometry args={[width, height, depth]} />
            </mesh>
        );
    };

    const createTopDecoration = () => {
        if (!hasTopDecoration) return null;

        const decorationHeight = height * 0.1;
        const decorationWidth = width * 0.9;

        const shape = new THREE.Shape();
        shape.moveTo(-decorationWidth / 2, 0);
        shape.lineTo(decorationWidth / 2, 0);
        shape.lineTo(decorationWidth / 3, decorationHeight);
        shape.lineTo(-decorationWidth / 3, decorationHeight);

        const extrudeSettings = {
            steps: 1,
            depth: frameThickness,
            bevelEnabled: false,
        };

        return (
            <mesh position={[0, height / 2 + decorationHeight / 2, 0]} castShadow receiveShadow>
                <extrudeGeometry args={[shape, extrudeSettings]} />
            </mesh>
        );
    };

    return (
        <group>
            {/* Rama pozioma - dolna */}
            {createFramePart(width, frameThickness, frameThickness, 0, -height / 2 + frameThickness / 2, 0)}

            {/* Rama pozioma - górna */}
            {createFramePart(width, frameThickness, frameThickness, 0, height / 2 - frameThickness / 2, 0)}

            {/* Rama pionowa - lewa */}
            {createFramePart(frameThickness, height, frameThickness, -width / 2 + frameThickness / 2, 0, 0)}

            {/* Rama pionowa - prawa */}
            {createFramePart(frameThickness, height, frameThickness, width / 2 - frameThickness / 2, 0, 0)}

            {/* Ozdobny daszek */}
            {createTopDecoration()}
        </group>
    );
};

export default RamaPrzesla;