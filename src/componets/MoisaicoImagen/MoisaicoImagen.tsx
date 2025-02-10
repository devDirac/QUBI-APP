import React, { useState } from "react";
//import { ImageList, ImageListItem, Box, Grid, CardMedia, Card } from "@mui/material";
import servicios1 from "assets/servicios/apm.png";
import servicios2 from "assets/servicios/arjion_b.png";
import servicios3 from "assets/servicios/metropoli.png";
import servicios4 from "assets/servicios/qubi.png";
import servicios5 from "assets/servicios/juno.png";
//import Masonry from "@mui/lab/Masonry";
import './index.scss'

import { Card, CardMedia, Tooltip } from "@mui/material";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"



const MoisaicoImagen = () => {
  const images = [
    { src: servicios1, title: "Imagen 1", id: 1, description: "La plataforma APM es un ecosistema colaborativo para la administración, control y seguimiento de proyectos de construcción. No importando el tipo de proyecto, APM es capaz de manejar un número ilimitado de contratos para un solo proyecto. " },
    { src: servicios2, title: "Imagen 2", id: 2, description: "Arjion es una plataforma tipo ERP para el control dentro de tu empresa" },
    { src: servicios3, title: "Imagen 3", id: 3, description: "Metropoli es una APP para el reporte de incidentes" },
    { src: servicios4, title: "Imagen 4", id: 4, description: "Qubi es una empresa que se dedica al desarollo tecnologico, ofrenciendo servicios de primera calidad " },
    { src: servicios5, title: "Imagen 5", id: 5, description: "Juno es un sistema de presición" },

  ];
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleImageHover = (image: any) => {
    setSelectedImage(image);
  };

  const handleImageLeave = () => {
    setSelectedImage(null);
  };

  return (
    <div style={{ position: 'relative' }}>
      <ResponsiveMasonry 
        //columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}

        columnsCountBreakPoints={{100: 1, 500: 2, 900: 3}}
        
      >
        <Masonry className="masonry-grid">
          {images.map((image, i) => (
            <div
              className="masonry-item"
              key={i}
              onMouseEnter={() => handleImageHover(image)}
              onMouseLeave={handleImageLeave}
            >
              <Tooltip title={image?.description}>
                <img src={image?.src} alt={`Imagen ${i}`} />
              </Tooltip>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {/* Popup de detalles */}
      {/* {selectedImage && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          <h2>{selectedImage.title}</h2>
          <p>{selectedImage.description}</p>
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
          />
        </div>
      )} */}
    </div>
  );
};

export default MoisaicoImagen;