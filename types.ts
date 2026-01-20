
export interface ProjectData {
  name: string;
  description: string;
  language: string;
  isPrivate: boolean;
}

export enum Step {
  INTRO = 0,
  SETUP = 1,
  AI_GENERATE = 2,
  COMMANDS = 3,
  FINISH = 4
}
