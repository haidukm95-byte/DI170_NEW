export type HeadingProps={
    title: string;
    subtitle: string;
    body?: string;
}

const Heading = ({ title, subtitle, body }: HeadingProps) =>{
// const Heading: React.FC<HeadingProps> = ({ title, subtitle, body }) =>{    --- more outdated approach
    return(
        <>
            <h2>Title: {title}</h2>
            <h3>Subtitle: {subtitle}</h3>
            <h4>Body: {body}</h4>
        </>
    );
};

export default Heading;