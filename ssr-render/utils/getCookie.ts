const getCookie = (cookie?:string): any => {
    const result: {
        [key: string]: string;
    } = {};
    if (cookie) {
        cookie.split(';').forEach(function (item: string) {
            const itemArr = item.trim().split('=');
            if (itemArr.length > 1) {
                result[itemArr[0]] = itemArr.splice(1, itemArr.length - 1).join('');
            }
        });
    }
    return result;
};

export { getCookie };