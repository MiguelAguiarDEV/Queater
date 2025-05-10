import { useState } from "react";
import { Category } from "@/types";
import Edit from "../Icons/Edit";
import Delete from "../Icons/Delete";
import Hide from "../Icons/Hide";
import Save from "../Icons/Save";
import Title from "../Category/Title";
import Description from "../Category/Description";
import axios from "axios";

export default function CategoryCard({ category }: { category: Category }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description);

    const handleSave = async () => {
        try {
            await axios.put(`/api/categories/${category.id}`, {
                name,
                description,
            });
            setIsEditing(false);
        } catch (err) {
            console.error("Error al guardar artículo:", err);
        }
    };

    return (
        <li
            className={`flex flex-col gap-4  p-4 rounded-md w-full transition-all duration-300 ease-in-out ${
                isEditing ? " bg-blue-50 text-blue-700" : "bg-gray-100"
            }`}
        >
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    <Title
                        name={name}
                        active={isEditing}
                        onChange={isEditing ? setName : undefined}
                    />
                </div>
                <div className="flex ml-auto gap-2">
                    <Hide cursor={true} />
                    {isEditing ? (
                        <button onClick={handleSave}>
                            <Save cursor={true} />
                        </button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>
                            <Edit cursor={true} />
                        </button>
                    )}
                    <Delete cursor={true} />
                </div>
            </div>

            <div className="flex flex-col justify-between h-full gap-4">
                <Description
                    description={description ?? ""}
                    active={isEditing}
                    onChange={isEditing ? setDescription : undefined}
                />
            </div>
        </li>
    );
}
