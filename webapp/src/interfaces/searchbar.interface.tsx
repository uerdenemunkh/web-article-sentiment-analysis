interface ISearchCallback {
    (query: string): void;
}

export default interface ISearchBar {
    callback: ISearchCallback;
    text: string;
}