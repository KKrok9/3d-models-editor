import styles from "./page.module.scss";
import EditorScene from "./components/editor-scene/EditorScene";

export default function Home() {
    return (
        <div className={styles.page}>
            <EditorScene />
        </div>
    );
}
