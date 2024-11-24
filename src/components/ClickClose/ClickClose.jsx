import { useState } from "react";

const ClickClose = () => {
  const [close, setClose] = useState(false);

  const toggle = () => {
    setClose((prev) => !prev);
  };
  return <div>ClickClose</div>;
};

export default ClickClose;
