import styles from "./SidePanel.module.scss";
import { FencePanelProps } from "@/app/props/FencePanelProps";
interface SidePanelProps {
    fenceParams: FencePanelProps;
    setFenceParams: React.Dispatch<React.SetStateAction<FencePanelProps>>;
    exportGLB: any;
}

const SidePanel: React.FC<SidePanelProps> = ({ fenceParams, setFenceParams, exportGLB }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFenceParams((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked :
                type === "number" ? parseFloat(value) || 0 : value,
        }));
    };


    const exportToExcel = () => {
        const csvContent = Object.entries(fenceParams)
            .map(([key, value]) => `${key},${value}`)
            .join("\n")

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", "fence_configuration.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className={styles.container}>
            <h2>Przęsło MagicKacper 1.0</h2>

            <h3>Dostosuj szerokość i wysokość</h3>

            {/* Wrapping each label and input pair in a div with class "row" */}
            <div className={styles.row}>
                <label>Wysokość przęsła: {fenceParams.height} m</label>
                <input type="range" name="height" min="0.5" max="3" step="0.1" value={fenceParams.height} onChange={handleChange} />
            </div>

            <div className={styles.row}>
                <label>Szerokość przęsła: {fenceParams.width} m</label>
                <input type="range" name="width" min="0.5" max="3" step="0.1" value={fenceParams.width} onChange={handleChange} />
            </div>

            <div className={styles.row}>
                <label>Liczba sztachet: {fenceParams.boardCount}</label>
                <input type="range" name="boardCount" min="2" max="20" step="1" value={fenceParams.boardCount} onChange={handleChange} />
            </div>

            <div className={styles.row}>
                <label>Grubość sztachet: {fenceParams.boardThickness}m</label>
                <input type="range" name="boardThickness" min="0.01" max="0.1" step="0.01" value={fenceParams.boardThickness} onChange={handleChange} />
            </div>

            <div className={styles.row}>
                <label>Pokaż górny profil</label>
                <input type="checkbox" name="displayTopFramePart" checked={fenceParams.displayTopFramePart} onChange={handleChange} />
            </div>

            <h3>Kolory</h3>

            <div className={styles.row}>
                <label>Kolor sztachet</label>
                <input type="color" name="boardColor" value={fenceParams.boardColor} onChange={handleChange} />
            </div>

            <div className={styles.row}>
                <label>Kolor ramy</label>
                <input type="color" name="frameColor" value={fenceParams.frameColor} onChange={handleChange} />
            </div>

            <button className={styles.resetButton} onClick={() => setFenceParams({
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
            })}>
                Przywróć domyślną konfigurację
            </button>

            <h3>Materiały</h3>

            <div className={styles.row}>
                <label>
                    Materiał sztachet:
                </label>
                <select name="boardMaterial" value={fenceParams.boardMaterial} onChange={handleChange}>
                    <option value="wood">Drewno</option>
                    <option value="metal">Metal</option>
                </select>

            </div>

            <div className={styles.row}>
                <label>
                    Materiał ramy:
                </label>
                <select name="frameMaterial" value={fenceParams.frameMaterial} onChange={handleChange}>
                    <option value="wood">Drewno</option>
                    <option value="metal">Metal</option>
                </select>

            </div>
            <button className={styles.exportButton1} onClick={exportGLB}>Exportuj model do GLB/GLTF</button>
            <button className={styles.exportButton2} onClick={exportToExcel}>Exportuj konfigurację do CSV</button>
        </div>
    );
};

export default SidePanel;
