import React from "react";
import { Button } from "react-bootstrap";
import "./index.scss";
import type { DragAndDropFieldProps } from "./types";
import { useDragAndDropField } from "./useDragAndDropField";
import { useIntl } from "react-intl";

const DragAndDropField:React.FC<DragAndDropFieldProps> = (props: DragAndDropFieldProps) => {
  const intl = useIntl();
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    files,
    thumbs,
    darkMode
  } = useDragAndDropField(props);
  
  return (
    <section className="container">
      <div className={darkMode ? 'drag-zone-dark drag-zone' : "drag-zone"} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>{props?.multiple ? intl.formatMessage({ id: 'drag_and_drop_component_titulo_1' }) : intl.formatMessage({ id: 'drag_and_drop_component_titulo_2' })}</p>
      </div>
      {props?.muestraBoton ? <div style={{ float: "right", position: "relative", top: "10px" }}>
        <Button
          variant="primary"
          disabled={!acceptedFiles?.length}
          onClick={() => {
            props?.onAction && props?.onAction(files);
          }}
        >
          Agregar elemento{acceptedFiles?.length > 1 ? "(s)" : ""}
        </Button>
      </div>:null}
      <aside>
        <br></br>
        <h5 style={darkMode ? { color:'white'}:{}}>Archivo</h5>
        <div>{thumbs}</div>
      </aside>
    </section>
  );
};

export default DragAndDropField;
