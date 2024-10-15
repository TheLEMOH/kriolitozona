import { Get, Post, Put, Remove } from "./download";

interface ServiceModel {
  url: string;
}

export default class Service {
  url: string;

  constructor(props: ServiceModel) {
    this.url = props.url;
  }

  async get() {
    const items = await Get(this.url);

    return items;
  }

  async getById(id: string | string[]) {
    const item = await Get(`${this.url}/${id}`);

    return item;
  }

  async getByExperiment(experimentId: string | string[]) {
    const item = await Get(`${this.url}?experimentId=${experimentId}`);

    return item;
  }

  async post(object: object) {
    const item = await Post(this.url, object);

    return item;
  }

  async update(object: any) {
    const item = await Put(`${this.url}/${object.id}`, object);

    return item;
  }

  async updateBulk(objects: any, experimentId: number) {
    const item = await Put(`${this.url}?experimentId=${experimentId}`, objects);

    return item;
  }

  async remove(id: string | string[]) {
    const item = await Remove(`${this.url}/${id}`);

    return item;
  }
}
