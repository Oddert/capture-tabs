import type { ReactNode } from 'react';

export interface IProps {
    children: ReactNode;
}

export interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

export interface LoginFormContent extends HTMLFormElement {
    readonly elements: FormElements;
}
