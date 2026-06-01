/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-arguments */

import type { Socket } from '../../utils/socketManager';
import type { Dispatch, Middleware, UnknownAction } from '@reduxjs/toolkit';

type TSocketMiddleware = (
    socket: Socket,
) => Middleware<{}, any, Dispatch<UnknownAction>>;

export const socketMiddleware: TSocketMiddleware =
    (socket) => (params) => (next) => (action) => {
        // @ts-expect-error Generic action
        if (action && 'type' in action) {
            switch (action.type) {
                case 'socket/connect': {
                    const state: any = params.getState();
                    if (state.auth.authenticated) {
                        socket.connect(
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            `ws://localhost:8081/ws?token=${state.auth.accessToken}`,
                        );
                        socket.on('open', () => {});
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        socket.on('message', (_data: MessageEvent<string>) => {
                            // params.dispatch(updateFromWS(data.data));
                        });
                        socket.on('close', () => {});
                    }
                    break;
                }
                case 'socket/disconnect':
                    socket.disconnect();
                    break;
                default:
                    break;
            }
        }

        next(action);
    };
