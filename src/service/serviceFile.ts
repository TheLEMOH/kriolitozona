import { Remove } from "./download";

interface ServiceModel {
  url: string;
}

export default class ServiceFile {
  url: string;

  constructor(props: ServiceModel) {
    this.url = props.url;
  }

  async get(experimentId: number, name: string) {
    fetch(`${this.url}/${experimentId}/${name}`)
      .then((res) => res.blob())
      .then((res) => {
        const a = document.createElement("a");
        a.setAttribute("download", name);
        const href = URL.createObjectURL(res);
        a.href = href;
        a.setAttribute("target", "_blank");
        a.click();
        URL.revokeObjectURL(href);
      });
  }

  async remove(experimentId: number, name: string) {
    const item = await Remove(`${this.url}/${experimentId}/${name}`);

    return item;
  }
}
