import {Pipe} from "angular2/core";

@Pipe({
  name: 'search'
})

export class SearchPipe {
  transform(value, [term]) {
    return value.filter((item) => {
      return item.title.startsWith(term);
    });
  }
}