import type { Metadata } from 'next';

import { Heading } from '@/components/ui/Heading';

import { TasksView } from './TaskView';
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
};

export default function TasksPage() {
	return (
		<div>
			<Heading title='Задачи' />
			<TasksView />
		</div>
	);
}
