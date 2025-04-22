export interface StepJsonInterface {
  _url?: string;
  _name?: string;
  _search?: string;
}

export interface StepInterface {
  path: string;
  url?: string;
  name?: string;
  search?: string;
}

export type StepJson = {
  [key: string]: StepJsonInterface;
};
