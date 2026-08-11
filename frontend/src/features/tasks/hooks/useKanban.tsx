import { useTasks } from "./useTasks";

export function useKanban(){

const{

tasks

}=useTasks();

return{

todo:

tasks.filter(

(task)=>task.status==="todo"

),

progress:

tasks.filter(

(task)=>task.status==="progress"

),

review:

tasks.filter(

(task)=>task.status==="review"

),

done:

tasks.filter(

(task)=>task.status==="done"

)

};

}