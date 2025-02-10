import { useState } from "react";
import { useDropzone } from "react-dropzone";
import type { DragAndDropFieldProps } from "./types"
import { useMaterialUIController } from "context";

export const useDragAndDropField = ( props: DragAndDropFieldProps ) => {
    const [controller] = useMaterialUIController();
    const [files, setFiles] = useState([]);
    const {
      darkMode
    } = controller;

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      multiple: props?.multiple,
      accept: props?.acepted ? props?.acepted : {
        "image/jpeg": [],
        "image/jpg": [],
        "image/png": [],
        "application/pdf": [],
        "application/vnd.ms-excel": [],
        "audio/*": [],
        "video/*": [],
        ".doc":[],
        ".docx":[],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":[],
      },
      onDrop: (acceptedFiles: any) => {
        setFiles(
          acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        ,);
        setTimeout(() => {
          props?.onAction && props?.onAction(acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ));
        }, 1000);
      },
    });
  
    const thumbs = files.map((file: any,a:number) => {
      return (
        <div key={a}>
          <h5 style={darkMode ? {color:'white'}:{}}>{file?.name}</h5>
        </div>
    )});
  
    return {
        getRootProps,
        getInputProps,
        acceptedFiles,
        files,
        thumbs,
        darkMode
     }
}