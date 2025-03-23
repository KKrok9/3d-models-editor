import Image from "next/image";
import styles from "./page.module.scss";
import EditorScene from "./components/editor-scene/EditorScene";
import SidePanel from "./components/side-panel/SidePanel";

export default function Home() {
    return (
        <div className={styles.page}>
            <EditorScene />
        </div>
    );
}
