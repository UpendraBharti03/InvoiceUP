import { useCallback, useState } from 'react';

/**
 * Common hook state to manage state of modals, popups etc.
 * @param initialState - whether the modal will be open by default or not.
 */
export function useModalState(initialState = false) {
    const [isModalOpen, setIsModalOpen] = useState(initialState);

    const handleOpen = useCallback(() => {
        setIsModalOpen(true);
    }, []);
    const handleClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleToggle = useCallback(() => {
        setIsModalOpen((prev) => !prev);
    }, []);

    return {
        isOpen: isModalOpen,
        handleOpen,
        handleClose,
        handleToggle,
    };
}
