import StoreModule from "../module";
import { categoryFormat } from "../../utils";

class CategoryState extends StoreModule {
  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  async getCategory() {
    const response = await fetch(
      `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
    );
   
    const { result } = await response.json();

    this.setState(
      {
        ...this.getState(),
        categories: [
          { _id: "", value: "", title: "Все", parent: null },
          ...categoryFormat(result.items),
        ],
        waiting: false,
      },
      "Загружен список категорий"
    );
  }
}

export default CategoryState;
