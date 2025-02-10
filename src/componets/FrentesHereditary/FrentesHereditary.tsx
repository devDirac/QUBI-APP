import React from 'react'
import { Grid } from '@mui/material'
import TimelineList from "../../examples/Timeline/TimelineList";
import TimelineItem from "../../examples/Timeline/TimelineItem";
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import type { FrentesHereditaryProps } from './types';
import moment from 'moment';
import './style.scss'
import useFrentesHereditary from './useFrentesHereditary';

const FrentesHereditary: React.FC<FrentesHereditaryProps> = (props: FrentesHereditaryProps) => {
    const {
        final,
        
    } = useFrentesHereditary(props)
    

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <TimelineList title={`Detalle `} subtitle={'Esta es la jerarquía que tiene el frente que seleccionaste '}>
                    <></>
                    {


                        final?.map((a: any, key: number) => {
                            return (
                                <TimelineItem
                                    key={key}
                                    elemento={a}
                                    onSelec={() => { }}
                                    color={key === 0 ? "success" : "info"}
                                    icon={key === 0 ? <LooksOneIcon /> : <FlipToFrontIcon />}
                                    title={a?.frente}
                                    dateTime={`${moment(a?.fecha_registro).format("MMMM DD YYYY, H:mm:ss")}`}
                                    description={`${a?.descripcion}`}
                                    lastItem={a?.id_frente === 0}
                                />
                            )
                        })
                    }
                </TimelineList>
            </Grid>
        </Grid>
    )


}

export default FrentesHereditary
