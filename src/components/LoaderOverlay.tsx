import React from "react";
import { Spinner } from "./ui/spinner";
import { Modal, ModalBody, ModalContent, ModalProps } from "@heroui/modal";
type Props = Omit<ModalProps, "children"> & {
  message?: string;
};

const LoaderOverlay = ({ message, ...props }: Props) => {
  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="flex flex-col items-center justify-center w-full h-full bg-slate-400 bg-opacity-60 ">
              <Spinner size="medium" className="text-white" />
              <h2 className="text-white text-lg mt-4">
                {message ?? "Loading..."}
              </h2>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoaderOverlay;
