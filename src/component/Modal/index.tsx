import React from 'react';
import ReactModal, { Props } from 'react-modal';
import classNames from 'classnames/bind';

import styles from './index.module.css';

const cx = classNames.bind(styles);

export interface OverlayProps extends Props {
  center?: boolean;
}

export const Overlay: React.FC<OverlayProps> = ({
  center = false,
  overlayClassName,
  children,
  ...rest
}) => {
  return (
    <ReactModal
      {...rest}
      overlayClassName={[
        cx('modal-overlay', { center: center }),
        overlayClassName,
      ].join(' ')}
    >
      {children}
    </ReactModal>
  );
};

export type ModalProps = OverlayProps & Props;

export const Modal: React.FC<ModalProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <Overlay {...rest} className={[cx('container'), className].join(' ')}>
      {children}
    </Overlay>
  );
};

export interface ConfirmModalProps {
  header?: React.ReactNode;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  body?: React.ReactNode;
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
  needCancel?: boolean;
  cancelText?: string;
  cancelClassName?: string;
  cancelStyle?: React.CSSProperties;
  confirmText?: string;
  confirmClassName?: string;
  confirmStyle?: React.CSSProperties;
  onClick?: (result: boolean) => void;
}

export const ConfirmModal: React.FC<
  ConfirmModalProps & OverlayProps & Props
> = ({
  className,
  header,
  headerClassName,
  headerStyle,
  body,
  bodyClassName,
  bodyStyle,
  needCancel = true,
  cancelText = '取消',
  cancelClassName,
  cancelStyle,
  confirmText = '確認',
  confirmClassName,
  confirmStyle,
  onClick = () => {},
  ...rest
}) => {
  return (
    <Modal {...rest} className={[cx('confirm-container'), className].join(' ')}>
      {header && (
        <div
          className={[cx('header'), headerClassName].join(' ')}
          style={headerStyle}
        >
          {header}
        </div>
      )}
      {body && (
        <div
          className={[cx('body'), bodyClassName].join(' ')}
          style={bodyStyle}
        >
          {body}
        </div>
      )}
      <div className={cx('footer')}>
        {needCancel && (
          <button
            onClick={() => onClick(false)}
            className={[cx('button', 'cancel'), cancelClassName].join(' ')}
            style={cancelStyle}
          >
            {cancelText}
          </button>
        )}
        <button
          onClick={() => onClick(true)}
          className={[cx('button', 'confirm'), confirmClassName].join(' ')}
          style={confirmStyle}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};
