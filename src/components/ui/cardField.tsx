import { ChangeEvent } from "react";

export default function CardField({
    id = "name",
    title = "Enter Name",
    isRequired = true,
    fieldType = "text",
    isTextHolder = true,
    textHolder = "Enter your name",
    fieldValue,
    onChangeFunc,
}: {
    id?: string,
    title?: string,
    isRequired?: boolean,
    fieldType?: string,
    isTextHolder?: boolean,
    textHolder?: string,
    fieldValue: string,
    onChangeFunc: (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}) {
    return (
        <>
            {isTextHolder ?
                <div className="my-1.5">
                    <label htmlFor={id} className="text-black">{title}{isRequired && "*"}</label>
                    <input
                        type={fieldType}
                        name={id}
                        id={id}
                        placeholder={textHolder}
                        value={fieldValue}
                        onChange={(e) => onChangeFunc(e)}
                        className="mx-2 my-1 border-2 border-[#e5e7eb] rounded-md px-1 text-black"
                        required={isRequired}
                    />
                </div>
                :
                <div className="my-1.5">
                    <label htmlFor={id} className="text-black">{title}{isRequired && "*"}</label>
                    <input
                        type={fieldType}
                        name={id}
                        id={id}
                        value={fieldValue}
                        onChange={(e) => onChangeFunc(e)}
                        className="mx-2 my-1 border-2 border-[#e5e7eb] rounded-md px-1 text-black"
                        required={isRequired}
                    />
                </div>
            }
        </>
    );
};