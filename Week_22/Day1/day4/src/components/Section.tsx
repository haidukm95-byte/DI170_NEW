import type { ReactNode, /* ReactElement */ } from "react";

type SectionProps={
    admin: string;
    children: ReactNode; //define plain text without any tag
    //children: ReactElement to define content within a tag
} 

const Section=({children, admin}: SectionProps)=>{
    return (
        <>
            <h2>Section component</h2>
            <p>Admin: {admin}</p>
            {children}
        </>
    )
}

export default Section