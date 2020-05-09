import React, { useEffect, useRef, FunctionComponent } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');
const Modal: FunctionComponent = function ({ children }) {
  const elRef = useRef(document.createElement('div'));

  useEffect(() => {
    if (!modalRoot) {
      return;
    }
    modalRoot.appendChild(elRef.current);

    // The returned function is the cleanup function
    return function () {
      modalRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
