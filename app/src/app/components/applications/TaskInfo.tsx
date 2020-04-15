import TaskTitle from 'applications/components/task-manager/TaskTitle';
import { List } from 'immutable';
import React from 'react';

interface IInstance {
    application: string;
    icon: string;
    id: string;
    themeColor: string;
    title: string;
}

interface ITaskInfoProps {
    instanceId: string;
    instances: IInstance[];
    offset: number;
    showTaskManager: boolean;
}

const TaskInfo = ({
    instanceId,
    instances,
    offset,
    showTaskManager,
}: ITaskInfoProps) => {
    const taskInstance = List(instances).find((instance) => {
        if (!instance) {
            return false;
        }

        return (instance.id === instanceId);
    });

    if (!showTaskManager || !taskInstance) {
        return null;
    }

    return (
        <TaskTitle
            icon={taskInstance.icon}
            offset={offset}
            themeColor={taskInstance.themeColor}
            title={taskInstance.title}
        />
    );
};

export default TaskInfo;
