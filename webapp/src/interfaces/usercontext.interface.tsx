interface INavbarContext {
    state: string;
    setState: Function;
}

export default interface IUserContext {
    navbar: INavbarContext;
};

export type { INavbarContext };