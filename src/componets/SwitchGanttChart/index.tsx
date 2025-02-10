import React from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Grid } from "@mui/material";
type ViewSwitcherProps = {
    isChecked: boolean;

    onViewListChange: (isChecked: boolean) => void;
    onViewModeChange: (viewMode: ViewMode) => void;
};
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
    onViewModeChange,
    onViewListChange,
    isChecked,
}) => {
    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", mt: 3 }} style={{ padding: '25px' }}  >
            <Grid item xs={6} md={6} style={{ textAlign: 'center', position: 'relative', top: -10 }}>
                <div className="Switch">
                    <label className="Switch_Toggle">
                        <input
                            type="checkbox"
                            defaultChecked={isChecked}
                            onClick={() => onViewListChange(!isChecked)}
                        />
                        <span className="Slider" />
                    </label>
                    Mostrar detalle
                </div>
            </Grid>
            <Grid item xs={6} md={6} style={{ textAlign: 'center', position: 'relative', top: -10 }}>
                <ButtonGroup>
                    <Button
                        variant="primary"
                        onClick={(e: any) => {
                            onViewModeChange(ViewMode.Hour)
                        }}
                        style={{ color: '#fff' }}
                    >
                        horas
                    </Button>

                    <Button
                        variant="primary"
                        onClick={(e: any) => {
                            onViewModeChange(ViewMode.Day)
                        }}
                        style={{ color: '#fff' }}
                    >
                        Dia
                    </Button>


                    <Button
                        variant="primary"
                        onClick={(e: any) => {
                            onViewModeChange(ViewMode.Week)
                        }}
                        style={{ color: '#fff' }}
                    >
                        Semana
                    </Button>


                    <Button
                        variant="primary"
                        onClick={(e: any) => {
                            onViewModeChange(ViewMode.Month)
                        }}
                        style={{ color: '#fff' }}
                    >
                        Mes
                    </Button>

                    <Button
                        variant="primary"
                        onClick={(e: any) => {
                            onViewModeChange(ViewMode.Year)
                        }}
                        style={{ color: '#fff' }}
                    >
                        Año
                    </Button>
                </ButtonGroup>
            </Grid>


        </Grid>
    );
};