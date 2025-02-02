import { useEffect, useState } from 'react';

import type { ITimerState } from '../interfaces/timer.interface';

import { useLoadSettings } from './useLoadSettings';
import type { ITimerRoundResponse } from '@/shared/interfaces/timer.interface';

export function useTimer(): ITimerState {
	const { breakInterval, workInterval } = useLoadSettings();
	const [isRunning, setIsRunning] = useState(false);
	const [isBreakTime, setIsBreakTime] = useState(false);
	const [secondsLeft, setSecondsLeft] = useState(workInterval * 60);
	const [activeRound, setActiveRound] = useState<ITimerRoundResponse>();

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft(secondsLeft => secondsLeft - 1);
			}, 1000);
		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isRunning, secondsLeft, workInterval, activeRound]);

	useEffect(() => {
		// Ранний выход, если время истекло
		if (secondsLeft > 0) return;

		//Переключение режима и установка нового времени одной операции
		setIsBreakTime(!isBreakTime);
		setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60);
	}, [secondsLeft, isBreakTime, workInterval, breakInterval]);

	return {
		activeRound,
		secondsLeft,
		setActiveRound,
		setIsRunning,
		setSecondsLeft,
		isRunning
	};
}
