import { ReactNode } from "react"


export interface Steps{
    name:string
    step:number
}

export interface StepperGeneralProps {
    children: ReactNode
    steps:Steps[]
    onStep:(activeStep:number)=>void
    activeStep:number
    textStepsCompleted:string
    darkMode:boolean
    isDisabledNext:boolean
}