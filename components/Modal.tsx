import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { useAuth } from "../context/AuthContext";

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal(props: ModalProps): JSX.Element | null {
  const { setOpenModal } = props;
  const [_document, set_document] = useState<Document | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    set_document(document);
  }, []);

  if (!_document) {
    return null;
  }

  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-slate-200 bg-opacity-50 text-white text-lg sm:text-xl flex flex-col z-20">
      <div className="flex items-center justify-between border-b border-solid bg-slate-900 border-white p-4">
        <h1 className="text-3xl sm:text-6xl select-none">
          TODO LIST
        </h1>
        <div className="flex items-center">
          <h2
            onClick={() => {
              logout();
              setOpenModal(false);
            }}
            className="select-none duration-300 hover:pl-2 cursor-pointer px-4"
          >
            Logout
          </h2>
          <i
            onClick={() => setOpenModal(false)}
            className="fa-solid fa-xmark duration-300 hover:rotate-90 text-lg sm:text-3xl cursor-pointer"
          ></i>
        </div>
      </div>
    </div>,
    _document.getElementById("portal") as Element
  );
}
