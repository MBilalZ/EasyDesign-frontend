import React, {Children} from 'react';
import {Dialog, DialogContent, DialogTitle} from '@mui/material';

const BaseIconModal = ({open, onClose, title, children}) => {
    let _body, _title;

    Children.forEach(children, child => {
        if (child.type === ModalIcon) {
            _title = child;
        }

        if (child.type === ModalBody) {
            _body = child;
        }
    });

    if (!_title) _title = <DialogTitle>{title}</DialogTitle>;
    if (!_body) _body = <DialogContent>{children}</DialogContent>;

    return (
        <Dialog open={open} onClose={onClose}>
            {_title}
            {_body}
        </Dialog>
    );
};

const ModalIcon = ({children}) => <DialogTitle>{children}</DialogTitle>;
const ModalBody = ({children}) => <DialogContent>{children}</DialogContent>;

BaseIconModal.Icon = ModalIcon;
BaseIconModal.Body = ModalBody;

export default BaseIconModal;
