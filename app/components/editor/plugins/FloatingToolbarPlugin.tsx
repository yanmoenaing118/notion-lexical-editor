import { createPortal } from "react-dom";
import FloatingToolbarComponent from "./FloatingToolbarComponent";
import { useState } from "react";

type Props = {
  anchorElement: HTMLDivElement;
};

const FloatingToolbarPlugin: React.FC<Props> = ({ anchorElement }) => {
  const [showFloatingToolbar, setFloatingToolbar] = useState(false);

  return createPortal(
    <FloatingToolbarComponent showMe={showFloatingToolbar} />,
    anchorElement,
  );
};

export default FloatingToolbarPlugin;
