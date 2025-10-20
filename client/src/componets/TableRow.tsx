import React, { FC } from 'react';
import { IUser } from '../models/response/IUser';

interface TableRowProps {
    id: string;
    user: IUser;
    isChecked: boolean;
    onToggle: (id: string) => void;
}

const TableRow: FC<TableRowProps> = ({ id, user, isChecked, onToggle }) => {
    return (
        <div className="d-flex align-items-center border-bottom p-2">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(id)}
                className="me-3"
            />
            <div className="flex-grow-1">
                <div><strong>{user.name}</strong></div>
                <div className="text-muted">{user.email}</div>
            </div>
            <div>
                {!user.isBlocked ? 
                    user.isActivated ?
                        (<span className="text-success fw-semibold">Active</span>) 
                        :
                        (<span className="fw-semibold">Unverified</span>)
                    : 
                    (<span className="text-danger fw-semibold">Blocked</span>) 
                }
            </div>
        </div>
    );
};

export default TableRow;