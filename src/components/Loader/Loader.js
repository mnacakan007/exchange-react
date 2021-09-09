import React from "react";
import classes from "./Loader.module.scss";

// eslint-disable-next-line
export default () => <div className={classes['loader-item']}>
  <div className={classes["lds-roller"]}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
