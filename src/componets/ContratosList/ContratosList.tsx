import React, { useState } from "react";
import type { ContratosListProps } from "./types";
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import SearchFiltro from "../../componets/SearchFiltro/SearchFiltro";
import ComplexProjectCard from "../../examples/Cards/ProjectCards/ComplexProjectCard";
import logo from "assets/images/logo.png";
import moment from "moment";
import "./style.scss";
import useContratosList from "./useContratosList";
import FormularioPerfilUsuarioContrato from "./FormularioPerfilUsuarioContrato";
import { numericFormatter } from "react-number-format";
import { calcularDiferenciaPorcentual } from "../../utils";

const ContratosList: React.FC<ContratosListProps> = (
  props: ContratosListProps
) => {
  const { handleFiltro, data, checkAll, setCheckAll } = useContratosList(props);

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", mt: 8 }}>
      <Grid item xs={12} md={12} style={{ textAlign: "center", padding: "24px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} />
          <Grid item xs={12} md={6}>
            <SearchFiltro onFiltro={handleFiltro} />
          </Grid>
        </Grid>
      </Grid>
      {props?.esAsigacion ? (
        <Grid item xs={12} md={12} style={{ textAlign: "center", padding: "24px" }}>
          <FormGroup style={{ float: "right" }}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(c) => {
                    props?.onCheckAll && props?.onCheckAll(c?.target?.checked);
                    setCheckAll(c?.target?.checked);
                  }}
                />
              }
              label="Asignar a todos los contratos"
            />
          </FormGroup>
        </Grid>
      ) : null}
      {data.length && !checkAll ? (
        data?.map((e: any, key: number) => {
          const dif:any = e?.total_importe_catalogo ? calcularDiferenciaPorcentual(e?.importe||0,e?.total_importe_catalogo||0) : 0;
          return (
            <Grid item xs={12} md={5} style={{ padding: "20px" }} key={key}>


              {props?.esAsigacion ? (
                <FormGroup style={{ float: "right" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={e?.check ? true : false}
                        onChange={(c) =>
                          props?.onCheck &&
                          props?.onCheck(c?.target?.checked, e)
                        }
                      />
                    }
                    label="Asignar"
                  />
                </FormGroup>
              ) : null}



              {!props?.esAsigacion ? (
                    <ComplexProjectCard
                      image={logo}
                      title={e?.contrato}
                      alertaImporteCatalogoVsImporteContrato={dif}
                      importeConcepto={e?.total_importe_catalogo}
                      element={e}
                      onSelect={(contrato) => {
                        props?.onSelect && props?.onSelect(contrato);
                      }}
                      onSelectMembers={(contrato) => {
                        props?.onSelectMembers && props?.onSelectMembers(contrato);
                      }}
                      description={`ID contrato: ${e?.id_contrato} ${e?.contratista === null
                        ? ""
                        : ", Contratista:" + e?.contratista
                        }, Importe : ${numericFormatter((e?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })} `}
                      dateTime={moment(e?.fecha_final).format("DD-MM-YYYY")}
                      members={e?.usuarios_asignados?.length}
                    />
              ) : props?.esAsigacion && !e?.check ? (
                <ComplexProjectCard
                  image={logo}
                  title={e?.contrato}
                  element={e}
                  onSelect={(contrato) => {
                    props?.onSelect && props?.onSelect(contrato);
                  }}
                  onSelectMembers={(contrato) => {
                    props?.onSelectMembers && props?.onSelectMembers(contrato);
                  }}
                  description={`ID contrato: ${e?.id_contrato} ${e?.contratista === null
                    ? ""
                    : ", Contratista:" + e?.contratista
                    }, Importe:${numericFormatter((e?.importe || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}, importe en catálogo : ${numericFormatter((e?.total_importe_catalogo || 0) + '', { thousandSeparator: ',', decimalScale: 2, fixedDecimalScale: true, prefix: '$' })}`}
                  dateTime={null}
                  members={-1}
                />
              ) : props?.esAsigacion && e?.check ? (
                <FormularioPerfilUsuarioContrato
                  procesando={props?.procesando}
                  enAccion={(d) => {
                    props?.enAccionFormulario && props?.enAccionFormulario(d, e)
                  }}
                />
              ) : null}
            </Grid>
          );
        })
      ) : data.length && checkAll ? (
        <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
          <FormularioPerfilUsuarioContrato
            procesando={props?.procesando}
            enAccion={(d) => {
              props?.enAccionFormulario && props?.enAccionFormulario(d, null)
            }}
          />
        </Grid>
      ) : (
        <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
          <h1>Sin resultados</h1>
        </Grid>
      )}
    </Grid>
  );
};

export default ContratosList;
