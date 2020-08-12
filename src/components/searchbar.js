import React, { useState } from "react";
import { ClearButton, SearchButton } from "./buttons";

// props.onChange - handler for search text changed [not propagated]
// props.onClear - handler for search text cleared [not propagated]
// props.onClick - handler for search requested [no default]
// props.placeholder - placeholder text [Search for ...]
// props.withClear - include a clear button?  [no if not present]
export const SearchBar = (props) => {

    const forwardChange = props.onChange;
    const forwardClear = props.onClear;
    const forwardClick = props.onClick;
    const withClear = props.withClear;
    const [searchText, setSearchText] = useState("");

    const onChange = e => {
        let searchText = e.target.value;
        console.log("SearchBar.onChange(" + searchText + ")");
        setSearchText(searchText);
        propagateChange();
    }

    const onClear = () => {
        let searchText = "";
        console.log("SearchBar.onClear()");
        setSearchText(searchText);
        if (forwardClear) {
            console.log("SearchBar.onClear()");
            forwardClear(searchText);
        }
        propagateChange();
    }

    const onClick = () => {
        if (forwardClick) {
            console.log("SearchBar.onClick(" + searchText + ")");
            forwardClick(searchText);
        } else {
            console.log("ERROR: No onClick handler sent to SearchBar");
        }
    }

    const propagateChange = () => {
        if (forwardChange) {
            console.log("SearchBar.propagateChange(" + searchText + ")");
            forwardChange(searchText);
        }
    }

    return (
        <div className="container">
            <div className="input-group">
                <SearchText
                    onChange={onChange}
                    placeholder={props.placeholder ? props.placeholder : ""}
                />
                <div className="input-group-append">
                    {withClear ? (
                        <ClearButton onClick={onClear}/>
                    ) : ( <pre/> ) }
                    <SearchButton onClick={onClick}/>
                 </div>
            </div>
        </div>
    );

}

const SearchText = (props) => {
    return (
        <input
            className="form-control"
            onChange={props.onChange}
            placeholder=
                {props.placeholder ? props.placeholder : "Search for ..."}
            type="text"
        />
    );
}
