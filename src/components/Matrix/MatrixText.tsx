type MatrixTextProps = {
    username: string;
    text: string;
};

export default function MatrixText(props: MatrixTextProps) {
    return (
        <div className="relative w-full overflow-hidden sm:text-2xl max-sm:text-xl selection:bg-primary-default selection:bg-opacity-[0.6] selection:text-white">
            <div className="absolute top-0 left-0 tracking-wide">
                {props.username}
            </div>

            <div
                className="relative z-10 w-full overflow-hidden tracking-wide bg-transparent outline-none resize-none text-glitch"
                style={{
                    textIndent: `${props.username.length + 2}ch`,
                }}
            >
                {props.text}
            </div>
        </div>
    );
}