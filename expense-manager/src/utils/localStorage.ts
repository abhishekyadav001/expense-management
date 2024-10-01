export const getLocalStorageItem = (key: string): any => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null; // Return null if item is not found
};

export const setLocalStorageItem = (key: string, data: any): void => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorageItem = (key: string): void => {
    localStorage.removeItem(key);
};

export const clearLocalStorage = (): void => {
    localStorage.clear();
};
