import { Context, createContext, useContext } from 'react';

export interface IUiSettingsContext {
    sidebarOpen?: boolean;
    size: 'small' | 'medium' | 'large';
    multiTasking?: boolean;
}

export const UiSettingsContext: Context<IUiSettingsContext> = createContext({
    sidebarOpen: false,
    size: 'small',
    multiTasking: false,
} as IUiSettingsContext);

export const UiSettingsProvider = UiSettingsContext.Provider;
export const useUiSettingsContext = () => useContext(UiSettingsContext);
