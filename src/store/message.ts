import { create } from 'zustand';

interface MessageState {
    shouldGoDown: boolean;
    setShouldGoDown(bool: boolean): void;
    reset(): void;
}

export const useMessageStore = create<MessageState>((set) => ({
    shouldGoDown: false,
    setShouldGoDown(bool) {
        set({ shouldGoDown: bool });
    },
    reset() {
        set({ shouldGoDown: false });
    },
}));
