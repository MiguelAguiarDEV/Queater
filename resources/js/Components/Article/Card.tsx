import { useState } from "react";
import axios from "axios";
import { Article } from "@/types";
import Title from "./Title";
import Price from "./Price";
import Edit from "../Icons/Edit";
import Delete from "../Icons/Delete";
import Hide from "../Icons/Hide";
import Description from "./Description";
import Image from "./Image";
import Save from "../Icons/Save";

export default function ArticleCard({ article }: { article: Article }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(article.title);
    const [price, setPrice] = useState(article.price);
    const [body, setBody] = useState(article.body);

    const handleSave = async () => {
        try {
            await axios.put(`/api/articles/${article.id}`, {
                title,
                price,
                body,
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
                <Image />
                <div className="flex flex-col gap-2">
                    <Title
                        title={title}
                        active={isEditing}
                        onChange={isEditing ? setTitle : undefined}
                    />
                    <Price
                        price={price}
                        active={isEditing}
                        onChange={isEditing ? setPrice : undefined}
                    />
                </div>
            </div>

            <div className="flex flex-col justify-between h-full gap-4">
                <Description
                    description={body}
                    active={isEditing}
                    onChange={isEditing ? setBody : undefined}
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
        </li>
    );
}
