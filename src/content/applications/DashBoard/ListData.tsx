import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { TaskList } from "src/models/sales_task_list";
import { config } from "src/utility/config/AppConfig";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";
import TaskListsTable from "./TaskListsTable";
import { commonErrorCallback } from "src/utility/http/ApiService";

function TaskLists() {
  const [taskLists, setTasks] = useState<TaskList[]>([]);
  const auth = useRecoilValue(authAtom);
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(`${config().apiUrl}/salestasks`, {
          params: { userId: auth.userId },
        });

        if (response.statusText === "OK") {
          const current = new Date();
          const today = `${current.getFullYear()}-${
            current.getMonth() < 10 ? "0" : ""
          }${current.getMonth() + 1}-${
            current.getDate() < 10 ? "0" : ""
          }${current.getDate()}`;
          response.data.forEach((element) => {
            if (element.execute_date !== null) {
              element.status = "completed";
            } else if (element.deadline === today) {
              element.status = "dueday";
            } else if (element.deadline < today) {
              element.status = "overdueday";
            } else {
              element.status = "pending";
            }
          });
          setTasks(response.data);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };

    getTasks();
  }, [auth.userId]);

  return (
    <Card>
      <TaskListsTable taskLists={taskLists} />
    </Card>
  );
}

export default TaskLists;
