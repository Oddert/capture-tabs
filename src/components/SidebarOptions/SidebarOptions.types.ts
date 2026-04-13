export interface IProps {
    permanent?: boolean;
    onClose: (args?: unknown) => void;
    onOpen: (args?: unknown) => void;
    open: boolean;
}
