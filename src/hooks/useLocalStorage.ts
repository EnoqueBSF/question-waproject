interface IUseLocalStorage {
  find({ key }: { key: string }): any;
  create({ key, data }: { key: string; data: string }): any;
  destroy({ key }: { key: string }): any;
  destroyAll(): void;
}

const useLocalStorage = (): IUseLocalStorage => {
  const find = ({ key }: { key: string }): any => {
    return localStorage.getItem(key);
  };

  const create = ({ key, data }: { key: string; data: string }): any => {
    return localStorage.setItem(key, data);
  };

  const destroy = ({ key }: { key: string }): any => {
    return localStorage.removeItem(key);
  };

  const destroyAll = (): void => {
    return localStorage.clear();
  };

  return { find, create, destroy, destroyAll };
};

export default useLocalStorage;
