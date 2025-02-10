import { useState } from 'react'
import type { StepperGeneralProps } from './types';


const useStepperGeneral = (props: StepperGeneralProps) => {
    const [skipped, setSkipped] = useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(props?.activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(props?.activeStep);
        }
        props?.onStep(props?.activeStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        props?.onStep(props?.activeStep - 1);
    };

    const handleReset = () => {
        props?.onStep(0);
    };

    return {
        handleReset,
        handleBack,
        handleNext
    }
}

export default useStepperGeneral
