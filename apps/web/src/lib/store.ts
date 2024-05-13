import { create } from "zustand";

interface RealtimeCountStore {
	realtimeCount: number;
	actions: {
		incrementRealtimeCount: () => void;
		resetRealtimeCount: () => void;
	};
}

const useRealtimeCountStore = create<RealtimeCountStore>((set) => ({
	realtimeCount: 0,
	actions: {
		incrementRealtimeCount: () => set((state) => ({ realtimeCount: state.realtimeCount + 1 })),
		resetRealtimeCount: () => set({ realtimeCount: 0 }),
	},
}));

export const useRealtimeCount = () =>
	useRealtimeCountStore((state) => {
		return { realtimeCount: state.realtimeCount };
	});
export const useRealtimeCountActions = () => useRealtimeCountStore((state) => state.actions);
