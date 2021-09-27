import React, { Fragment } from "react";
import snip from "./Spinner.gif";

export const Spinner = () => {
  return (
    <Fragment>
      <img
        src={snip}
        alt="loading.."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </Fragment>
  );
};

export default Spinner;
