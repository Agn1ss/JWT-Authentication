import React, { FC, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import TableRow from "./TableRow";
import { IUser } from "../models/response/IUser";
import ActionButton from "./ActionButton";

const TableFramework: FC = () => {
  const { store } = useContext(Context);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);


  useEffect(() => {
    store.fetchUsers();
  }, [store]);

  const sortedUsers = useMemo(() => {
    return [...store.users].sort((a: IUser, b: IUser) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" })
    );
  }, [store.users]);

  const handleToggle = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds]
  );

  const handleBlock = async () => {
    await Promise.all(selectedIds.map((id) => store.blockUser(id)));
    setSelectedIds([]);
  };

  const handleUnlock = async () => {
    await Promise.all(selectedIds.map((id) => store.unlockUser(id)));
    setSelectedIds([]);
  };

  const handleDelete = async () => {
    await Promise.all(selectedIds.map((id) => store.deleteUser(id)));
    setSelectedIds([]);
  };

  if (store.isLoading) {
    return <div className="text-gray-500 text-lg p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <ActionButton 
          onClick={handleBlock}
          className="me-1"
        >
          Block
        </ActionButton>
        <ActionButton 
          onClick={handleUnlock}
          className="me-1"
        >
          Unlock
        </ActionButton>
        <ActionButton 
          onClick={handleDelete}
          className="me-1"
        >
          Delete
        </ActionButton>
      </div>

      <div className="border-top border-3 border-dark rounded-0">
        {sortedUsers.map((user) => (
          <TableRow
            key={user._id}
            id={user._id}
            user={user}
            isChecked={isSelected(user._id)}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default observer(TableFramework);