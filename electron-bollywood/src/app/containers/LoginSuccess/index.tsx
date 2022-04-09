import React, { useEffect } from "react";
import './index.scss';

export function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []); 

  return <div className="logged">Thanks for loggin in! <span id="page-tag" hidden>start</span></div>;
}
