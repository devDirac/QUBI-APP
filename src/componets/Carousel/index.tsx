import React from "react";
import Carousel from "react-bootstrap/Carousel";
import type { CarouselProps } from "./types";
import "./index.scss";

const CarouselComponent: React.FC<CarouselProps> = (props: CarouselProps) => {
  return (
    <div >
      <Carousel fade variant={'dark'} onSelect={(a) => {
        const text = props?.images.find((s: any,key:number) => key === a);
        props?.onItemSelect && props?.onItemSelect(text?.text,text?.titulo);
      }}>
        {props?.images?.map((img, k) => {
          return (
            <Carousel.Item key={k}>
              <img width={props?.width || '80%'} height={props?.height || '80%'} style={{borderRadius:'5px'}} src={img?.img} alt="..." />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
