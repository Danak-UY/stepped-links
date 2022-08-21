interface StepJsonInterface {
  _url?: string;
  _name?: string;
  _search?: string;
}

type StepJson = {
  [key: string]: StepJsonInterface;
};

export default StepJson;
