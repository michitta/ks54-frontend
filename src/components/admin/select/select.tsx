import { FC } from "react";
import Select from "react-select";
import AsyncSelect, { AsyncProps } from "react-select/async";
import { StateManagerProps } from "react-select/dist/declarations/src/stateManager";

export const Selector: FC<StateManagerProps> = (data) => {
    return (
        <Select {...data} styles={{
            option: (defaultStyles, state) => ({
                ...defaultStyles,
                borderRadius: "12px",
                cursor: "pointer",
                "&:hover": {
                    transition: "0.2s ease-in-out",
                    background: "#333333",
                    color: "rgba(255, 255, 255, 0.75)",
                },
            }),
            control: (baseStyles, state) => ({
                ...baseStyles,
                width: "275px",
                cursor: "pointer",
                height: "52px",
                paddingLeft: "6px",
                background: "#1E1E1E",
                border: "1px solid #333333",
                borderRadius: "12px",
                "&:hover": {
                    background: "#222222",
                },
            }),
            placeholder: (defaultStyles) => ({
                ...defaultStyles,
                fontFamily: 'Manrope',
                fontWeight: 600,
                fontSize: "16px",
            }),
            singleValue: (defaultStyles) => ({
                ...defaultStyles,
                color: "#FFFFFF80",
            }),
            dropdownIndicator: (defaultStyles) => ({
                ...defaultStyles,
                display: "none",
            }),
            indicatorSeparator: (defaultStyles) => ({
                ...defaultStyles,
                display: "none",
            }),
            menu: (defaultStyles) => ({
                ...defaultStyles,
                background: "#1E1E1E",
                padding: "10px",
                color: "#FFFFFF80",
                borderRadius: "12px",
                border: "1px solid #333333",
            }),
            menuList: (defaultStyles) => ({
                ...defaultStyles,
                padding: "0",
                overflow: "hidden",
            }),
            input: (defaultStyles) => ({
                ...defaultStyles,
                color: "#FFFFFF80",
            }),
        }}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: "none",
                    primary: "none",
                    primary50: "none",
                    primary75: "none",
                },
            })
            } required={true}
            hideSelectedOptions={true} isSearchable={false} />
    )
}

export const AsyncSelector: AsyncSelect = (data) => {
    return (
        <AsyncSelect {...data} styles={{
            option: (defaultStyles, state) => ({
                ...defaultStyles,
                borderRadius: "12px",
                cursor: "pointer",
                "&:hover": {
                    transition: "0.1s ease-in-out",
                    background: "#333333",
                    color: "rgba(255, 255, 255, 0.75)",
                },
            }),
            control: (baseStyles, state) => ({
                ...baseStyles,
                width: "275px",
                cursor: "pointer",
                height: "52px",
                paddingLeft: "6px",
                background: "#1E1E1E",
                border: "1px solid #333333",
                borderRadius: "12px",
                "&:hover": {
                    background: "#222222",
                },
            }),
            placeholder: (defaultStyles) => ({
                ...defaultStyles,
                fontFamily: 'Manrope',
                fontWeight: 600,
                fontSize: "16px",
            }),
            singleValue: (defaultStyles) => ({
                ...defaultStyles,
                color: "#FFFFFF80",
            }),
            dropdownIndicator: (defaultStyles) => ({
                ...defaultStyles,
                display: "none",
            }),
            indicatorSeparator: (defaultStyles) => ({
                ...defaultStyles,
                display: "none",
            }),
            menu: (defaultStyles) => ({
                ...defaultStyles,
                background: "#1E1E1E",
                padding: "10px",
                color: "#FFFFFF80",
                borderRadius: "12px",
                border: "1px solid #333333",
            }),
            menuList: (defaultStyles) => ({
                ...defaultStyles,
                padding: "0",
            }),
            input: (defaultStyles) => ({
                ...defaultStyles,
                color: "#FFFFFF80",
            }),
        }}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: "none",
                    primary: "none",
                    primary50: "none",
                    primary75: "none",
                },
            })
            } required={true}
            hideSelectedOptions={true} />
    )
}