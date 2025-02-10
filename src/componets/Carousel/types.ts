export interface CarouselProps {
    images: any[]
    width?:string
    height?:string
    onItemSelect?:(text:string,titulo:string)=>void
}