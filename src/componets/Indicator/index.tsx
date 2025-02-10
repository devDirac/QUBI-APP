import React from "react";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import './style.scss';

interface IndicatorProps {
    data: any;
    titulo: string
    enAccion?: (accion: string, row: any) => void;
}
const Indicator: React.FC<IndicatorProps> = (
    props: IndicatorProps
) => {
    return (
        <div style={{ width: '100%' }}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props?.titulo || ''}
                    </Typography>
                    <Typography variant="h3" component="div">
                        {props?.data?.[0]?.total || 0}
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                    <Button variant="outlined" size="small" onClick={(e) => {
                        props?.enAccion && props?.enAccion('detalle', props?.data);
                    }}>Ver detalle</Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default Indicator;
