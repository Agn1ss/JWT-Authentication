import { useState, useCallback } from 'react';

export const useSelectedItems = <T extends string>() => {
    const [selectedIds, setSelectedIds] = useState<T[]>([]);

    const handleToggle = useCallback((id: T) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
    }, []);

    const isSelected = useCallback((id: T) => selectedIds.includes(id), [selectedIds]);

    const clearSelected = useCallback(() => setSelectedIds([]), []);

    const hasSelected = selectedIds.length > 0;

    return {
        selectedIds,
        handleToggle,
        isSelected,
        clearSelected,
        hasSelected,
        setSelectedIds
    };
};