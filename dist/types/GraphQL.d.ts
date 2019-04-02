export declare namespace GraphQL {
    namespace Connection {
        interface Edge<T> {
            cursor: string;
            node: T;
        }
        interface PageInfo {
            end_cursor: string;
            has_next_page: boolean;
            has_previous_page: boolean;
            start_cursor: string;
        }
    }
    interface Connection<T = {}> {
        count: number;
        edges: Array<Connection.Edge<T>>;
        page_info: Connection.PageInfo;
    }
}
