export const baseUrl = "localhost:80";
// export const baseUrl = "fastapi-backend-presentation.herokuapp.com";

export const getLogger: (tag: string) => (...args: any) => void =
    tag => (...args) => console.log(tag, ...args);

const log = getLogger('api')

interface ResponseProps<T> {
    data: T
}

export function withLogs<T>(promise: Promise<ResponseProps<T>>, functionName: string): Promise<T> {
    log(`${functionName} - started`);
    return promise
        .then(result => {
            log(`${functionName} - succeeded`);
            return Promise.resolve(result.data);
        })
        .catch(error => {
            log(`${functionName} - failed`);
            return Promise.reject(error)
        });
}

export const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const formDataConfig = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}

export const authConfig = (token?: string) => ({
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
});
