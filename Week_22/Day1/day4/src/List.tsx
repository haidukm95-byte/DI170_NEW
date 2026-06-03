import React, {type ReactNode} from "react";

//GENERIC TYPE COMPONENT <T>

type ListProps<T>={
    items: T[]
}

export default function List<T>({items}: ListProps<T>){
    return(
        <>
            <h2>List of Generic Items</h2>
            {items && items.map((item, idx)=>{
                return(
                    <>
                        <div key={idx}>{item as ReactNode}</div>
                    </>
                )
            })}
        </>
    )
}