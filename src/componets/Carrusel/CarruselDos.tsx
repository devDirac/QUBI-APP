import React, { useState, useRef, useEffect } from "react";
import env from "react-dotenv";

interface CarruselDosProps {
    mediaItems: any[]
}

const CarruselDos: React.FC<CarruselDosProps> = (props: CarruselDosProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const videoRef: any = useRef(null);

    useEffect(() => {
        const currentItem = props?.mediaItems[currentIndex];
        let timeout: any;
        if (currentItem.type === "image") {
            timeout = setTimeout(() => {
                goToNext();
            }, currentItem.duration);
        } else if (currentItem.type === "video" && videoRef.current) {
            const video: any = videoRef.current;
            video.play().catch((err: any) => console.error("Autoplay failed:", err));
            video.onended = () => {
                goToNext();
            };
        }
        return () => {
            clearTimeout(timeout);
            if (videoRef.current) {
                videoRef.current.onended = null;
            }
        };
    }, [currentIndex]);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % props?.mediaItems.length);
    };

    const currentItem = props?.mediaItems[currentIndex];

    return (
        <div style={{ textAlign: "center", height: '100%' }}>
            {currentItem.type === "image" ? (
                <img

                    src={` ${env.API_URL_DOCUMENTOS === 'https://diracapm.qubi.com.mx/' ? env.API_URL_DOCUMENTOS + (currentItem.ruta_media || "").replaceAll('storage/app/', '') : env.API_URL_DOCUMENTOS + currentItem.ruta_media}`}
                    alt={`Slide ${currentIndex}`}
                    style={{
                        width: "95vw", // Ancho máximo
                        height: "75vh", // Alto máximo
                        objectFit: "contain", // Ajustar sin recortar
                        objectPosition: "center", // Centrar contenido
                    }}
                />
            ) : (
                <video
                    ref={videoRef}
                    src={`${env.API_URL_DOCUMENTOS === 'https://diracapm.qubi.com.mx/' ? env.API_URL_DOCUMENTOS + (currentItem.ruta_media || "").replaceAll('storage/app/', '') : env.API_URL_DOCUMENTOS + currentItem.ruta_media} `}
                    muted
                    style={{ width: "100vw", height: "75vh", }}
                />
            )}
        </div>
    );
}

export default CarruselDos;