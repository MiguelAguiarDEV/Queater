import { Category } from "@/types";
import Edit from "../Icons/Edit";
import Delete from "../Icons/Delete";
import Hide from "../Icons/Hide";
import Save from "../Icons/Save";
import Title from "../Category/Title";
import Description from "../Category/Description";
import { useEditableCategory } from "@/Hooks/useEditableCategory";
import SquareX from "../Icons/SquareX";

export default function CategoryCard({ category }: { category: Category }) {
    const {
        name,
        setName,
        description,
        setDescription,
        isEditing,
        startEditing,
        cancelEditing,
        saveChanges,
    } = useEditableCategory(category);

    return (
        <li
            className={`flex flex-col gap-4 p-4 rounded-md w-full transition-all duration-300 ease-in-out ${
                isEditing ? " bg-blue-50 text-blue-700" : "bg-gray-100"
            }`}
        >
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    <Title name={name} active={isEditing} onChange={setName} />
                </div>
                <div className="flex ml-auto gap-2">
                    {isEditing ? (
                        <Hide cursor={true} hide />
                    ) : (
                        <Hide cursor={true} />
                    )}

                    {isEditing ? (
                        <button onClick={saveChanges}>
                            <Save cursor={true} />
                        </button>
                    ) : (
                        <button onClick={startEditing}>
                            <Edit cursor={true} />
                        </button>
                    )}
                    {isEditing ? (
                        <button onClick={cancelEditing}>
                            <SquareX cursor={true} />
                        </button>
                    ) : (
                        <Delete cursor={true} />
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-between h-full gap-4">
                <Description
                    description={description}
                    active={isEditing}
                    onChange={setDescription}
                />
            </div>
        </li>
    );
}
