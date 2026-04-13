class Socket {
    socket: WebSocket | null;

    constructor() {
        this.socket = null;
    }

    connect(url: string) {
        this.socket ??= new WebSocket(url);
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    on(eventName: string, callback: (data: MessageEvent<string>) => void) {
        if (this.socket) {
            this.socket.addEventListener(eventName, (data) => {
                // @ts-expect-error conflicting types
                callback(data);
            });
        }
    }
}

export { Socket };
