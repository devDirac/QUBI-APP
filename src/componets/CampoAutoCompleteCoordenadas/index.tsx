import React from "react";
import type { CampoAutoCompleteCoordenadasProps } from "./types";
import Form from 'react-bootstrap/Form';
import "./index.scss";
import { Button, InputGroup } from "react-bootstrap";
import CheckIcon from '@mui/icons-material/Check';
import _ from "lodash";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useCampoAutoCompleteCoordenadas } from "./useCampoAutoCompleteCoordenadas";

const CampoAutoCompleteCoordenadas: React.FC<CampoAutoCompleteCoordenadasProps> = (props: CampoAutoCompleteCoordenadasProps) => {

  const {
    showFeedback,
    isValid,
    handleFocus,
    field,
    errorMessage,
    formik,
    darkMode,
    esError,
    bootstrapRef
  } = useCampoAutoCompleteCoordenadas(props);

  

  return (
    <div
      className={`${showFeedback ? isValid : ""}`}
    >
      <div>
        {props?.label && <Form.Label style={darkMode ? { color: 'white' } : {}}>{props?.label}</Form.Label>}
        <InputGroup className="mb-3" style={esError ? { border: 'solid 1px red', borderRadius: '8px' } : formik?.touched && !formik?.error && !_.isEmpty(formik?.value) ? { border: 'solid 1px #01db01', borderRadius: '8px' } : { borderRadius: '8px' }}>
          <Form.Control
            ref={bootstrapRef}
            placeholder={props?.placeholder || ""}
            onFocus={handleFocus}
            {...{required:props?.required,value:props?.value,name:props?.name,label:props?.label,id:props?.id}}
            {...field}
            style={darkMode ? { borderRight: 'none', backgroundColor: 'transparent', color: 'white' } : { borderRight: 'none' }}
          />
          {esError || (formik?.touched && !formik?.error && !_.isEmpty(formik?.value)) ? <Button variant="outline-secondary" style={{ border: '1px solid rgb(227 215 215)', borderLeft: 'none' }} id="button-addon2">
            {
              esError ? <ErrorOutlineIcon color="error" /> :
                formik?.touched && !formik?.error && !_.isEmpty(formik?.value) ?
                  <CheckIcon color="success" /> : null
            }
          </Button> : null}
        </InputGroup>
      </div>
      <div className="flex items-center space-between">
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live="polite"
            className="feedback text-sm"
            style={{ textAlign: "left", paddingLeft: "5px", color: "red", fontWeight: 'normal', fontSize: '12px' }}
          >
            {errorMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CampoAutoCompleteCoordenadas;