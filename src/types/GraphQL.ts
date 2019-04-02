export namespace GraphQL {
  export namespace Connection {
    export interface Edge<T> {
      cursor: string;
      node: T;
    }

    export interface PageInfo {
      end_cursor: string;
      has_next_page: boolean;
      has_previous_page: boolean;
      start_cursor: string;
    }
  }

  export interface Connection<T = {}> {
    count: number;
    edges: Array<Connection.Edge<T>>;
    page_info: Connection.PageInfo;
  }
}
