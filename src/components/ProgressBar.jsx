import React, { useEffect } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import "./nprogress-custom.css";

const ProgressBar = ({ progress }) => {
  useEffect(() => {
    if (progress > 0) {
      nprogress.set(progress / 100);
      nprogress.start();
    } else {
      nprogress.done();
    }
  }, [progress]);

  return null;
};

export default ProgressBar;
