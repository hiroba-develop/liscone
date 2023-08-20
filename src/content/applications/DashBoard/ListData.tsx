import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { TaskList } from "src/models/sales_task_list";
import { MemberList } from "src/models/member_list";
import { config } from "src/utility/config/AppConfig";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";
import TaskListsTable from "./TaskListsTable";
import { commonErrorCallback } from "src/utility/http/ApiService";

function TaskLists() {
  const [taskLists, setTasks] = useState<TaskList[]>([]);
  const [memberLists, setMemberLists] = useState<MemberList[]>([]);
  const authUser = useRecoilValue(authAtom);
  useEffect(() => {
    const getTasks = async () => {
      try {
        const responseUser = await axios.get(
          `${config().apiUrl}/members/allMemberId`,
          {
            params: {
              memberId: authUser.userId,
            },
          }
        );
        if (responseUser.statusText === "OK") {
          setMemberLists(responseUser.data);
        }
        const response = await axios.get(`${config().apiUrl}/salestasks`);
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
              element.status = "overday";
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
  }, [authUser.userId]);

  return (
    <Card>
      <TaskListsTable taskLists={taskLists} memberLists={memberLists} />
    </Card>
  );
}

export default TaskLists;
