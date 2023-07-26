type MatrixTextProps = {
    username: string;
    text: string;
};

export default function MatrixText(props: MatrixTextProps) {
    return (
        <div className="relative w-full min-h-[1.6em] leading-normal sm:text-2xl max-sm:text-xl selection:bg-primary-default selection:bg-opacity-[0.6] selection:text-white">
            <p className="absolute top-0 left-0 tracking-wide">
                {props.username}
            </p>

            <p
                className="relative z-10 w-full tracking-wide bg-transparent outline-none resize-none text-glitch"
                style={{
                    textIndent: `${props.username.length + 2}ch`,
                }}
            >
                {props.text}
            </p>
        </div>
    );
}