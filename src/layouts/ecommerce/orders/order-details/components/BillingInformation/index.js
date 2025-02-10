/**
=========================================================
* Otis Admin PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Otis Admin PRO React componets
import MDBox from "../../../../../../componets/MDBox/index";
import MDTypography from "../../../../../../componets/MDTypography";

// Otis Admin PRO React context
import { useMaterialUIController } from "context";

function BillingInformation(props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <>
      <MDBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor={darkMode ? "transparent" : "grey-100"}
        borderRadius="lg"
        p={3}
        mt={2}
      >
        <MDBox width="100%" display="flex" flexDirection="column" lineHeight={1}>
          {props?.title ? <MDBox mb={2}>
            <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
              <>{props?.title || ''}</>
            </MDTypography>
          </MDBox> : null}
          {
            (props?.itemsToshow || []).map((i, k) => {
              return (
                <MDBox mb={1} lineHeight={0} key={k}>
                  <MDTypography variant="caption" fontWeight="regular" color="text">
                    {i?.label ? <>{i?.label || ''}:&nbsp;&nbsp;&nbsp;</>:null}
                    <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                     <>{i?.value}</> 
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              )
            })
          }
        </MDBox>
      </MDBox>
    </>
  );
}

export default BillingInformation;
