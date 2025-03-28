import { number } from "yup";

export type Student = {
    id: number;
    name: string;
    email: string;
    course: string;
    gpa: number;
    enrollmentDate: string ;
    avatar: string;
  };
  
  interface IInstructor {
    name: string;
    avatar: string;
  }
  
  interface ILesson {
    id: number;
    title: string;
    duration: string;
    completed: boolean;
  }
  
  interface IModule {
    title: string;
    lessons: ILesson[];
  }
  
  interface IMaterial {
    title: string;
    type: string;
    size: string;
  }
  
  export type ICourse= {
    _id:any;
    title: string;
    progress: number;
    instructor: IInstructor;
    curriculum: IModule[];
    materials: IMaterial[];
  }