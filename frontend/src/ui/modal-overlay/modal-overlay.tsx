import * as React from 'react';
import modaloverlayStyles from './modal-overlay.module.css';
import { FC } from 'react';

interface IModalOverlayProps {
  onClose: () => void;
  extraClass?: string;
}

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClose })=> {
  return (
    <div className={modaloverlayStyles.overlay} onClick={onClose}>
    </div>
  );
};