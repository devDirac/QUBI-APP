import React from 'react'
import { useDropzone } from "react-dropzone";
import UploadFileIcon from '@mui/icons-material/UploadFile';
interface OnDropZoneConIdProps {
    id: any
    onFiles: (data: any) => void
}

const OnDropZoneConId: React.FC<OnDropZoneConIdProps> = (props: OnDropZoneConIdProps) => {
    const onDrop = (acceptedFiles: any) => {
        props?.onFiles(acceptedFiles.map((file: any) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                id: props?.id
            })
        ))
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <span {...getRootProps()} style={{cursor:'pointer', color:'rgb(26, 115, 232)'}}>
            <input {...getInputProps()} />
            <UploadFileIcon fontSize='large' /> Subir archivo
        </span>
    );
}

export default OnDropZoneConId
